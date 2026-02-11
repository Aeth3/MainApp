import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Card from "./Card"; // adjust path
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function MasonryGrid({
    items = [],
    numColumns = 2,
    iconMap = {},
    onPress,
    maxItems = 6,
}) {
    const [expanded, setExpanded] = useState(false);

    // Decide which items to show
    const displayItems = expanded ? items : items.slice(0, maxItems);
    const hasMore = items.length > maxItems;

    // Track columns and cumulative heights
    const columns = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array(numColumns).fill(0);

    displayItems.forEach((item) => {
        const labelLength = item.label?.length || 0;
        const estimatedHeight = 60 + (labelLength > 15 ? 20 : 0);
        const shortestColIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestColIndex].push(item);
        columnHeights[shortestColIndex] += estimatedHeight;
    });

    return (
        <View>
            <View style={styles.container}>
                {columns.map((colItems, colIndex) => (
                    <View style={styles.column} key={`col-${colIndex}`}>
                        {colItems.map((item, index) => (
                            <TouchableOpacity
                                key={`${item.label}-${index}`}
                                activeOpacity={0.8}
                                onPress={() => onPress?.(item)}
                            >
                                <Card style={styles.card} noPadding rounded>
                                    <View
                                        style={[
                                            styles.inner,
                                            item.label?.length > 15 && styles.innerColumn,
                                        ]}
                                    >
                                        {item.iconType === "image" ? (
                                            <Image
                                                source={{ uri: item.icon }}
                                                style={[
                                                    styles.iconImage,
                                                    item.label?.length > 15 && styles.iconImageLarge,
                                                ]}
                                                resizeMode="contain"
                                            />
                                        ) : iconMap[item.icon] ? (
                                            <FontAwesomeIcon
                                                icon={iconMap[item.icon]}
                                                size={item.label?.length > 15 ? 26 : 22}
                                                color={item.color || "#1877F2"}
                                                style={item.label?.length > 15 ? styles.iconColumn : styles.iconRow}
                                            />
                                        ) : null}

                                        <Text
                                            style={[
                                                styles.label,
                                                item.label?.length > 15 && styles.labelCentered,
                                            ]}
                                            numberOfLines={2}
                                        >
                                            {item.label}
                                        </Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            {/* See More / See Less button full width */}
            {hasMore && (
                <TouchableOpacity
                    style={[styles.seeMoreButton]}
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text style={styles.seeMoreText}>
                        {expanded ? "See Less" : "See More"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 6,
    },
    column: {
        flex: 1,
    },
    cardWrapper: {
        marginBottom: 6,
    },
    card: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    inner: {
        flexDirection: "row",
        alignItems: "center",
    },
    innerColumn: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingVertical: 8,
    },
    iconRow: {
        marginRight: 10,
    },
    iconColumn: {
        marginBottom: 6,
    },
    iconImage: {
        width: 24,
        height: 24,
        borderRadius: 6,
        marginRight: 10,
    },
    iconImageLarge: {
        width: 28,
        height: 28,
        marginBottom: 6,
        marginRight: 0,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#222",
    },
    labelCentered: {
        textAlign: "center",
    },
    seeMoreButton: {
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#98AFC7",
        borderRadius: 8,
        marginTop: 6,
        marginHorizontal: 10
    },
    seeMoreText: {
        fontSize: 14,
        fontWeight: "600",
        color: '#1C1C1C',
    },
});
