import React from "react";
import DynamicRenderer from "../../../components/DynamicRenderer";
import { iconMap } from "../../../assets/icons/iconMap";


/**
 * Returns a menu UI tree based on config.
 * Keeps logic hidden and reusable.
 */
export function MenuBuilder(config) {
    const menuConfig = {
        ...config,
        title: "MENU",
        secondaryIcons: [],
        profilePicture: "",
        headerStyle: { backgroundColor: config.colors.background },
        icons: config.menuIcons,
        iconStyle: { backgroundColor: config.colors.background },
    };

    // Return the menu JSX (not a component)
    return config.menuSections.map((item, id) => (
        <DynamicRenderer
            key={id}
            item={item}
            config={menuConfig}
            iconMap={iconMap}
        />
    ));
}
