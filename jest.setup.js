import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";

global.__DEV__ = true;

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native-bootsplash", () => ({
  hide: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = {
    View: "View",
    createAnimatedComponent: (Component) => Component,
    useSharedValue: (value) => ({ value }),
    useAnimatedStyle: (updater) => updater(),
    useAnimatedProps: (updater) => updater(),
    withTiming: (value) => value,
    withSpring: (value) => value,
    interpolate: (value) => value,
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    cancelAnimation: jest.fn(),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };

  return {
    __esModule: true,
    default: Reanimated,
    ...Reanimated,
  };
});

jest.mock("react-native-sqlite-storage", () => ({
  openDatabase: jest.fn(() => ({
    transaction: (callback) => {
      const tx = {
        executeSql: (_query, _params = [], success) => {
          if (typeof success === "function") {
            success(tx, { rows: { length: 0, item: () => ({}) } });
          }
          return true;
        },
      };
      callback(tx);
    },
  })),
}));

jest.mock("react-native-fs", () => ({}));

jest.mock("react-native-webview", () => ({
  WebView: (props) => {
    const React = require("react");
    const { View } = require("react-native");
    return React.createElement(View, props);
  },
}));
