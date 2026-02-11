const QUEUE_KEY = "offline_http_queue_v1";

const loadQueueModule = ({ initialQueue = [], requestImpl } = {}) => {
  jest.resetModules();

  const getItem = jest.fn(async (key) => {
    if (key !== QUEUE_KEY) return null;
    return JSON.stringify(initialQueue);
  });
  const setItem = jest.fn(async () => undefined);

  const request = jest.fn(requestImpl || (async () => ({ ok: true })));

  jest.doMock("../../../package/src/infra/storage/asyncStorageAdapter", () => ({
    asyncStorageAdapter: {
      getItem,
      setItem,
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
  }));

  jest.doMock("../../../package/src/infra/http/apiClient", () => ({
    __esModule: true,
    default: { request },
  }));

  let moduleUnderTest;
  jest.isolateModules(() => {
    moduleUnderTest = require("../../../package/src/infra/http/offlineRequestQueue");
  });

  return { moduleUnderTest, getItem, setItem, request };
};

describe("offlineRequestQueue", () => {
  it("enqueueOfflineRequest appends a queued request and persists it", async () => {
    const { moduleUnderTest, setItem } = loadQueueModule({
      initialQueue: [],
    });

    const item = await moduleUnderTest.enqueueOfflineRequest({
      method: "POST",
      url: "/loans",
      data: { amount: 100 },
    });

    expect(item).toEqual(
      expect.objectContaining({
        method: "POST",
        url: "/loans",
        data: { amount: 100 },
        requestId: expect.any(String),
        queuedAt: expect.any(String),
      })
    );

    expect(setItem).toHaveBeenCalledWith(
      QUEUE_KEY,
      expect.any(String)
    );
    const persisted = JSON.parse(setItem.mock.calls[0][1]);
    expect(persisted).toHaveLength(1);
    expect(persisted[0]).toEqual(expect.objectContaining({ url: "/loans" }));
  });

  it("flushOfflineQueue returns zero counts when queue is empty", async () => {
    const { moduleUnderTest, request, setItem } = loadQueueModule({
      initialQueue: [],
    });

    const result = await moduleUnderTest.flushOfflineQueue();

    expect(result).toEqual({ flushed: 0, remaining: 0 });
    expect(request).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it("flushOfflineQueue flushes successful requests and clears queue", async () => {
    const { moduleUnderTest, request, setItem } = loadQueueModule({
      initialQueue: [
        { method: "POST", url: "/a", data: { a: 1 } },
        { method: "PATCH", url: "/b", data: { b: 2 } },
      ],
      requestImpl: async () => ({ ok: true }),
    });

    const result = await moduleUnderTest.flushOfflineQueue();

    expect(result).toEqual({ flushed: 2, remaining: 0 });
    expect(request).toHaveBeenCalledTimes(2);
    expect(setItem).toHaveBeenCalledWith(QUEUE_KEY, JSON.stringify([]));
  });

  it("keeps network-like failures in queue", async () => {
    const queue = [{ method: "POST", url: "/retry", data: { id: 1 } }];
    const { moduleUnderTest, setItem } = loadQueueModule({
      initialQueue: queue,
      requestImpl: async () => {
        throw { message: "Network request failed" };
      },
    });

    const result = await moduleUnderTest.flushOfflineQueue();

    expect(result).toEqual({ flushed: 0, remaining: 1 });
    expect(setItem).toHaveBeenCalledWith(QUEUE_KEY, JSON.stringify(queue));
  });

  it("drops non-network failures from queue", async () => {
    const { moduleUnderTest, setItem } = loadQueueModule({
      initialQueue: [{ method: "POST", url: "/bad", data: { id: 1 } }],
      requestImpl: async () => {
        throw { status: 400, message: "Bad Request" };
      },
    });

    const result = await moduleUnderTest.flushOfflineQueue();

    expect(result).toEqual({ flushed: 0, remaining: 0 });
    expect(setItem).toHaveBeenCalledWith(QUEUE_KEY, JSON.stringify([]));
  });
});
