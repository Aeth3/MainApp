import { useEffect, useState } from "react";
import {
  getIsOnline,
  subscribeToNetworkStatus,
} from "../../infra/network/networkMonitor";

export const useOfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(getIsOnline());

  useEffect(() => {
    const unsubscribe = subscribeToNetworkStatus(setIsOnline);
    return () => unsubscribe();
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
  };
};

