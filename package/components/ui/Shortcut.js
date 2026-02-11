// ShortcutItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../theme/Theme";

export default function Shortcut({ item, onPress }) {
    const { colors } = useTheme ? useTheme() : { colors: { textPrimary: "#000" } };

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPress?.(item)}
            activeOpacity={0.8}
        >
            {/* App Icon */}
            <Image
                source={{ uri: item.icon }}
                style={styles.icon}
                resizeMode="cover"
            />

            {/* App Name */}
            <Text
                numberOfLines={2}
                style={[styles.label, { color: colors.textPrimary }]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 80,
        alignItems: "center",
        marginRight: 12,
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
    },
    label: {
        marginTop: 6,
        fontSize: 12,
        textAlign: "center",
    },
});
