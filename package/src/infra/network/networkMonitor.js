let isOnline = true;
let started = false;
let nativeUnsubscribe = null;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener(isOnline);
    } catch (_error) {
      // Listener errors should not break notification fan-out.
    }
  });
};

const updateOnlineState = (nextValue) => {
  const normalized = Boolean(nextValue);
  if (normalized === isOnline) return;
  isOnline = normalized;
  notifyListeners();
};

const getConnectivityValue = (state) =>
  Boolean(state?.isConnected) && Boolean(state?.isInternetReachable ?? true);

export const startNetworkMonitoring = () => {
  if (started) return;
  started = true;

  try {
    // Dynamic import so the app still runs if NetInfo is not installed yet.
    const NetInfo = require("@react-native-community/netinfo").default;

    NetInfo.fetch()
      .then((state) => updateOnlineState(getConnectivityValue(state)))
      .catch(() => undefined);

    nativeUnsubscribe = NetInfo.addEventListener((state) => {
      updateOnlineState(getConnectivityValue(state));
    });
  } catch (_error) {
    // Fallback to default online=true behavior without NetInfo.
    isOnline = true;
  }
};

export const stopNetworkMonitoring = () => {
  if (typeof nativeUnsubscribe === "function") {
    nativeUnsubscribe();
  }
  nativeUnsubscribe = null;
  started = false;
};

export const subscribeToNetworkStatus = (listener) => {
  listeners.add(listener);
  listener(isOnline);
  return () => listeners.delete(listener);
};

export const getIsOnline = () => isOnline;
