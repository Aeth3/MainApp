const loadOfflineHttpModule = ({
  isOnline = true,
  apiRequestImpl = async () => ({ ok: true }),
  getItemImpl = async () => null,
  enqueueImpl = async () => ({
    requestId: "q_1",
    queuedAt: "2026-01-01T00:00:00.000Z",
  }),
  flushImpl = async () => ({ flushed: 0, remaining: 0 }),
} = {}) => {
  jest.resetModules();

  const request = jest.fn(apiRequestImpl);
  const getItem = jest.fn(getItemImpl);
  const setItem = jest.fn(async () => undefined);
  const enqueueOfflineRequest = jest.fn(enqueueImpl);
  const flushOfflineQueue = jest.fn(flushImpl);
  const getIsOnline = jest.fn(() => isOnline);

  jest.doMock("../../../package/src/infra/http/apiClient", () => ({
    __esModule: true,
    default: { request },
  }));

  jest.doMock("../../../package/src/infra/storage/asyncStorageAdapter", () => ({
    asyncStorageAdapter: {
      getItem,
      setItem,
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
  }));

  jest.doMock("../../../package/src/infra/http/offlineRequestQueue", () => ({
    enqueueOfflineRequest,
    flushOfflineQueue,
  }));

  jest.doMock("../../../package/src/infra/network/networkMonitor", () => ({
    getIsOnline,
  }));

  let moduleUnderTest;
  jest.isolateModules(() => {
    moduleUnderTest = require("../../../package/src/infra/http/offlineHttp");
  });

  return {
    moduleUnderTest,
    request,
    getItem,
    setItem,
    enqueueOfflineRequest,
    flushOfflineQueue,
    getIsOnline,
  };
};

describe("offlineHttp", () => {
  it("returns cached GET response while offline", async () => {
    const cached = { list: [{ id: 1 }] };
    const { moduleUnderTest, request } = loadOfflineHttpModule({
      isOnline: false,
      getItemImpl: async () =>
        JSON.stringify({
          createdAt: "2026-01-01T00:00:00.000Z",
          data: cached,
        }),
    });

    const result = await moduleUnderTest.requestOfflineFirst({
      method: "GET",
      url: "/loans",
      params: { q: "abc" },
    });

    expect(request).not.toHaveBeenCalled();
    expect(result).toEqual({
      ...cached,
      _offline: true,
      _source: "cache",
    });
  });

  it("queues write request while offline", async () => {
    const { moduleUnderTest, enqueueOfflineRequest, request } = loadOfflineHttpModule({
      isOnline: false,
      enqueueImpl: async () => ({
        requestId: "q_123",
        queuedAt: "2026-01-01T00:00:00.000Z",
      }),
    });

    const result = await moduleUnderTest.requestOfflineFirst({
      method: "post",
      url: "/loans",
      data: { amount: 100 },
    });

    expect(request).not.toHaveBeenCalled();
    expect(enqueueOfflineRequest).toHaveBeenCalledWith({
      method: "POST",
      url: "/loans",
      data: { amount: 100 },
      params: undefined,
      headers: undefined,
    });
    expect(result).toEqual({
      queued: true,
      requestId: "q_123",
      queuedAt: "2026-01-01T00:00:00.000Z",
      _offline: true,
      _source: "queue",
    });
  });

  it("writes GET cache and triggers queue flush on online success", async () => {
    const serverResponse = { items: [1, 2, 3] };
    const { moduleUnderTest, request, setItem, flushOfflineQueue } = loadOfflineHttpModule({
      isOnline: true,
      apiRequestImpl: async () => serverResponse,
    });

    const result = await moduleUnderTest.requestOfflineFirst({
      method: "GET",
      url: "/loans",
      params: { page: 1 },
    });

    expect(request).toHaveBeenCalledWith({
      method: "GET",
      url: "/loans",
      params: { page: 1 },
    });
    expect(result).toEqual(serverResponse);
    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem.mock.calls[0][0]).toContain("offline_get_cache_v1:GET:/loans:");
    expect(flushOfflineQueue).toHaveBeenCalled();
  });

  it("falls back to cached GET on network-like error while online", async () => {
    const cached = { items: [{ id: 5 }] };
    const { moduleUnderTest } = loadOfflineHttpModule({
      isOnline: true,
      apiRequestImpl: async () => {
        throw { message: "Network request failed" };
      },
      getItemImpl: async () =>
        JSON.stringify({
          createdAt: "2026-01-01T00:00:00.000Z",
          data: cached,
        }),
    });

    const result = await moduleUnderTest.requestOfflineFirst({
      method: "GET",
      url: "/loans",
    });

    expect(result).toEqual({
      ...cached,
      _offline: true,
      _source: "cache",
    });
  });

  it("throws non-network errors without queue/cache fallback", async () => {
    const apiError = { status: 400, message: "Bad Request" };
    const { moduleUnderTest, enqueueOfflineRequest } = loadOfflineHttpModule({
      isOnline: true,
      apiRequestImpl: async () => {
        throw apiError;
      },
    });

    await expect(
      moduleUnderTest.requestOfflineFirst({
        method: "POST",
        url: "/loans",
        data: { amount: 100 },
      })
    ).rejects.toEqual(apiError);

    expect(enqueueOfflineRequest).not.toHaveBeenCalled();
  });
});
