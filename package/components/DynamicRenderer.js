import React from "react";
import { Text } from "react-native";
import { componentRegistry } from "./ComponentRegistry";

const isDev = typeof __DEV__ !== "undefined" && __DEV__;

const warn = (message, detail) => {
    if (isDev) {
        console.warn(`[DynamicRenderer] ${message}`, detail ?? "");
    }
};

const UnknownComponent = ({ type, message }) => {
    if (!isDev) return null;

    return (
        <Text style={{ color: "#b00020", paddingVertical: 6, paddingHorizontal: 8 }}>
            {message ?? `Unknown component type: ${String(type)}`}
        </Text>
    );
};

const isObject = (value) => value !== null && typeof value === "object";
const isArray = (value) => Array.isArray(value);

const validators = {
    header: (config) => config == null || isObject(config),
    stories: (config) => config == null || isArray(config.stories),
    feed: (config) => config == null || isArray(config.posts),
    home: (config) => config == null || isArray(config.homeSections),
    videos: (config) => config == null || isArray(config.reelsData),
    swiper: (config) => config == null || isArray(config.pages),
};

const validateConfig = (type, config) => {
    const validator = validators[type];
    return validator ? validator(config) : true;
};

const DynamicRenderer = ({ item, config, iconMap = {}, secondaryIconsMap = {}, actionHandlers = {}, props }) => {
    if (!item || typeof item !== "object") {
        warn("Invalid item", item);
        return <UnknownComponent message="Invalid component config" />;
    }

    const type = item.type;
    if (!type || typeof type !== "string") {
        warn("Missing or invalid type", item);
        return <UnknownComponent message="Missing component type" />;
    }

    if (!validateConfig(type, config)) {
        warn("Invalid config for type", { type, config });
        return <UnknownComponent type={type} message={`Invalid config for type: ${type}`} />;
    }

    const renderFn = componentRegistry[type];

    if (!renderFn) {
        warn("Unknown component type", type);
        return <UnknownComponent type={type} />;
    }

    try {
        return renderFn(config, { iconMap, secondaryIconsMap, actionHandlers, props });
    } catch (error) {
        console.error(`[DynamicRenderer] Render failed for type: ${type}`, error);
        return <UnknownComponent type={type} message="Component render error" />;
    }
};

export default DynamicRenderer;
