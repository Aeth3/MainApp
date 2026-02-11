const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

const loadNetworkMonitorModule = ({ fetchState, addEventListenerImpl } = {}) => {
  jest.resetModules();

  const nativeUnsubscribe = jest.fn();
  const addEventListener = jest.fn((handler) => {
    if (typeof addEventListenerImpl === "function") {
      addEventListenerImpl(handler);
    }
    return nativeUnsubscribe;
  });
  const fetch = jest.fn(async () => fetchState ?? { isConnected: true, isInternetReachable: true });

  jest.doMock("@react-native-community/netinfo", () => ({
    __esModule: true,
    default: {
      fetch,
      addEventListener,
    },
  }));

  let moduleUnderTest;
  jest.isolateModules(() => {
    moduleUnderTest = require("../../../package/src/infra/network/networkMonitor");
  });

  return {
    moduleUnderTest,
    fetch,
    addEventListener,
    nativeUnsubscribe,
  };
};

describe("networkMonitor", () => {
  it("subscribeToNetworkStatus emits initial state and unsubscribe stops updates", () => {
    const { moduleUnderTest } = loadNetworkMonitorModule();
    const listener = jest.fn();

    const unsubscribe = moduleUnderTest.subscribeToNetworkStatus(listener);
    expect(listener).toHaveBeenCalledWith(true);

    unsubscribe();
    moduleUnderTest.startNetworkMonitoring();
  });

  it("startNetworkMonitoring updates online state from NetInfo.fetch", async () => {
    const { moduleUnderTest } = loadNetworkMonitorModule({
      fetchState: { isConnected: false, isInternetReachable: false },
    });

    const listener = jest.fn();
    moduleUnderTest.subscribeToNetworkStatus(listener);
    moduleUnderTest.startNetworkMonitoring();
    await flushPromises();

    expect(moduleUnderTest.getIsOnline()).toBe(false);
    expect(listener).toHaveBeenLastCalledWith(false);
  });

  it("event listener updates online state", async () => {
    let capturedHandler;
    const { moduleUnderTest } = loadNetworkMonitorModule({
      addEventListenerImpl: (handler) => {
        capturedHandler = handler;
      },
    });

    const listener = jest.fn();
    moduleUnderTest.subscribeToNetworkStatus(listener);
    moduleUnderTest.startNetworkMonitoring();
    await flushPromises();

    capturedHandler({ isConnected: false, isInternetReachable: false });
    expect(moduleUnderTest.getIsOnline()).toBe(false);
    expect(listener).toHaveBeenLastCalledWith(false);

    capturedHandler({ isConnected: true, isInternetReachable: true });
    expect(moduleUnderTest.getIsOnline()).toBe(true);
    expect(listener).toHaveBeenLastCalledWith(true);
  });

  it("stopNetworkMonitoring calls native unsubscribe", async () => {
    const { moduleUnderTest, nativeUnsubscribe } = loadNetworkMonitorModule();

    moduleUnderTest.startNetworkMonitoring();
    await flushPromises();
    moduleUnderTest.stopNetworkMonitoring();

    expect(nativeUnsubscribe).toHaveBeenCalled();
  });
});
