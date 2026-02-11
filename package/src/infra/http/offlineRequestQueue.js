import apiClient from "./apiClient";
import { asyncStorageAdapter } from "../storage/asyncStorageAdapter";

const OFFLINE_QUEUE_KEY = "offline_http_queue_v1";

const toArray = (value) => (Array.isArray(value) ? value : []);

const parseJson = (raw, fallback) => {
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
};

const readQueue = async () => {
  const raw = await asyncStorageAdapter.getItem(OFFLINE_QUEUE_KEY);
  if (!raw) return [];
  return toArray(parseJson(raw, []));
};

const writeQueue = async (queue) => {
  await asyncStorageAdapter.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(toArray(queue)));
};

export const enqueueOfflineRequest = async (requestConfig) => {
  const queue = await readQueue();
  const queuedAt = new Date().toISOString();
  const requestId = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const item = { ...requestConfig, requestId, queuedAt };

  queue.push(item);
  await writeQueue(queue);

  return item;
};

let isFlushing = false;

export const flushOfflineQueue = async () => {
  if (isFlushing) return { flushed: 0, remaining: -1 };

  isFlushing = true;
  try {
    const queue = await readQueue();
    if (!queue.length) return { flushed: 0, remaining: 0 };

    const remaining = [];
    let flushed = 0;

    for (const item of queue) {
      try {
        await apiClient.request({
          method: item.method,
          url: item.url,
          data: item.data,
          params: item.params,
          headers: item.headers,
        });
        flushed += 1;
      } catch (error) {
        const status = error?.status ?? error?.response?.status;
        const message = String(error?.message || "").toLowerCase();
        const networkLike = !status || message.includes("network");

        if (networkLike) {
          remaining.push(item);
          continue;
        }

        // Drop permanently failed requests (4xx/validation/etc) from the queue.
      }
    }

    await writeQueue(remaining);
    return { flushed, remaining: remaining.length };
  } finally {
    isFlushing = false;
  }
};

