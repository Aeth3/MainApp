import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card({
    children,
    style,
    noPadding = false,
    noShadow = false,
    rounded = true,
}) {
    return (
        <View
            style={[
                styles.card,
                noPadding && { padding: 0 },
                noShadow && { shadowOpacity: 0, elevation: 0 },
                rounded ? { borderRadius: 12 } : { borderRadius: 0 },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginHorizontal: 12,
        marginVertical: 6,

        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,

        // Android Elevation
        elevation: 4,

        // Border for definition
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#e5e5e5",
    },
});
