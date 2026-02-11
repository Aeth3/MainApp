// YourShortcuts.js
import React from "react";
import Shortcuts from "../../../components/ui/Shortcuts";
import { useActionHandlers } from "../../../global/actionHandlers";

export default function YourShortcuts({ config }) {
    const actionHandlers = useActionHandlers({
        profile1: (item) => console.log("profile1"),
        message: (item) => console.log("Opening message for:", item.name),
    });

    return (
        <Shortcuts
            title={config.shortcutsTitle}
            items={config.shortcuts}
            onPress={(item) => actionHandlers[item.action]?.(item)}
        />
    );
}
