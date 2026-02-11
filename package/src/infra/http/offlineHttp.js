import apiClient from "./apiClient";
import { asyncStorageAdapter } from "../storage/asyncStorageAdapter";
import {
  enqueueOfflineRequest,
  flushOfflineQueue,
} from "./offlineRequestQueue";
import { getIsOnline } from "../network/networkMonitor";

const GET_CACHE_PREFIX = "offline_get_cache_v1";

const buildMethod = (method) => String(method || "get").toUpperCase();

const isNetworkLikeError = (error) => {
  const status = error?.status ?? error?.response?.status;
  const message = String(error?.message || "").toLowerCase();

  return !status || message.includes("network") || message.includes("timeout");
};

const stableValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(stableValue);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = stableValue(value[key]);
        return acc;
      }, {});
  }

  return value;
};

const makeCacheKey = ({ method, url, params, data }) =>
  `${GET_CACHE_PREFIX}:${buildMethod(method)}:${url}:${JSON.stringify(
    stableValue({
      params: params || {},
      data: data || {},
    })
  )}`;

const readCachedGet = async (cacheKey) => {
  const raw = await asyncStorageAdapter.getItem(cacheKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return parsed?.data ?? null;
  } catch (_error) {
    return null;
  }
};

const writeCachedGet = async (cacheKey, data) => {
  const payload = {
    createdAt: new Date().toISOString(),
    data,
  };
  await asyncStorageAdapter.setItem(cacheKey, JSON.stringify(payload));
};

export const requestOfflineFirst = async (
  config,
  { queueOfflineWrites = true, cacheReads = true, treatAsRead = false } = {}
) => {
  const method = buildMethod(config?.method);
  const isRead = method === "GET" || treatAsRead;
  const isCurrentlyOnline = getIsOnline();

  if (!isCurrentlyOnline && isRead && cacheReads) {
    const cached = await readCachedGet(makeCacheKey(config));
    if (cached !== null) {
      return {
        ...cached,
        _offline: true,
        _source: "cache",
      };
    }
  }

  if (!isCurrentlyOnline && !isRead && queueOfflineWrites) {
    const queued = await enqueueOfflineRequest({
      method,
      url: config?.url,
      data: config?.data,
      params: config?.params,
      headers: config?.headers,
    });

    return {
      queued: true,
      requestId: queued.requestId,
      queuedAt: queued.queuedAt,
      _offline: true,
      _source: "queue",
    };
  }

  try {
    const response = await apiClient.request(config);

    if (isRead && cacheReads) {
      const cacheKey = makeCacheKey(config);
      await writeCachedGet(cacheKey, response);
    }

    // Best effort replay of queued writes whenever connectivity exists.
    flushOfflineQueue().catch(() => undefined);
    return response;
  } catch (error) {
    const networkLike = isNetworkLikeError(error);
    if (!networkLike) throw error;

    if (isRead && cacheReads) {
      const cached = await readCachedGet(makeCacheKey(config));
      if (cached !== null) {
        return {
          ...cached,
          _offline: true,
          _source: "cache",
        };
      }
    }

    if (!isRead && queueOfflineWrites) {
      const queued = await enqueueOfflineRequest({
        method,
        url: config?.url,
        data: config?.data,
        params: config?.params,
        headers: config?.headers,
      });

      return {
        queued: true,
        requestId: queued.requestId,
        queuedAt: queued.queuedAt,
        _offline: true,
        _source: "queue",
      };
    }

    throw error;
  }
};

export const flushQueuedRequests = () => flushOfflineQueue();
