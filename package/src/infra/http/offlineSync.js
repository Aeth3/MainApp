import { flushQueuedRequests } from "./offlineHttp";
import {
  startNetworkMonitoring,
  stopNetworkMonitoring,
  subscribeToNetworkStatus,
} from "../network/networkMonitor";

let initialized = false;
let unsubscribe = null;

export const initializeOfflineSync = () => {
  if (initialized) return;
  initialized = true;

  startNetworkMonitoring();
  flushQueuedRequests().catch(() => undefined);

  unsubscribe = subscribeToNetworkStatus((online) => {
    if (!online) return;
    flushQueuedRequests().catch(() => undefined);
  });
};

export const disposeOfflineSync = () => {
  if (!initialized) return;
  initialized = false;

  if (typeof unsubscribe === "function") {
    unsubscribe();
  }
  unsubscribe = null;
  stopNetworkMonitoring();
};

