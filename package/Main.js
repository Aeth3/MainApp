import { useEffect } from "react";
import { ContextProvider } from './context/context'
import RootNavigator from "./navigators/RootNavigator"
import {
    disposeOfflineSync,
    initializeOfflineSync,
} from "./src/infra/http/offlineSync";
export default function Main() {
    useEffect(() => {
        initializeOfflineSync();
        return () => {
            disposeOfflineSync();
        };
    }, []);

    return <ContextProvider>
        <RootNavigator />
    </ContextProvider>
}
