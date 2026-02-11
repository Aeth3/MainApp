import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../theme/Theme";
import Shortcut from "./Shortcut";


export default function Shortcuts({ title = "", items = [], onPress }) {
    const { colors } = useTheme ? useTheme() : { colors: { textPrimary: "#000", background: "#fff" } };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Section Title */}
            <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>

            {/* Horizontal Scroll List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {items.map((item, index) => (
                    <Shortcut key={index} item={item} onPress={onPress} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 12,
        marginBottom: 8,
    },
    scrollContent: {
        paddingHorizontal: 12,
    },
});
