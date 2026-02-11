import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { iconMap } from "../../assets/icons/iconMap";

export default function CollapsibleList({ items = [] }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Animated values for each item
    const animatedValues = useRef(items.map(() => ({
        height: new Animated.Value(0),
        opacity: new Animated.Value(0),
    }))).current;

    const toggleExpand = (index) => {
        const isExpanding = expandedIndex !== index;

        // Collapse currently expanded item
        if (expandedIndex !== null && expandedIndex !== index) {
            Animated.parallel([
                Animated.timing(animatedValues[expandedIndex].height, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValues[expandedIndex].opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start();
        }

        if (isExpanding) {
            // Expand new item
            Animated.parallel([
                Animated.timing(animatedValues[index].height, {
                    toValue: 100, // maximum height of content, adjust if needed
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValues[index].opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
            setExpandedIndex(index);
        } else {
            // Collapse item
            Animated.parallel([
                Animated.timing(animatedValues[index].height, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValues[index].opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start();
            setExpandedIndex(null);
        }
    };

    return (
        <View style={styles.container}>
            {items.map((item, index) => {
                const isExpanded = index === expandedIndex;
                return (
                    <View key={index}>
                        <TouchableOpacity style={styles.item} onPress={() => toggleExpand(index)}>
                            <FontAwesomeIcon icon={iconMap[item.icon]} size={18} style={styles.icon} />
                            <Text style={styles.title}>{item.title}</Text>
                            <FontAwesomeIcon
                                icon={isExpanded ? faChevronUp : faChevronDown}
                                size={14}
                                style={styles.chevron}
                            />
                        </TouchableOpacity>

                        {/* Animated Content */}
                        <Animated.View
                            style={[
                                styles.content,
                                {
                                    height: animatedValues[index].height,
                                    opacity: animatedValues[index].opacity,
                                    overflow: "hidden",
                                },
                            ]}
                        >
                            <Text style={styles.contentText}>{item.content}</Text>
                        </Animated.View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 6,
        borderBottomWidth: 0.2
    },
    icon: {
        marginRight: 12,
        color: "#555",
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: "#222",
    },
    chevron: {
        color: "#555",
    },
    content: {
        paddingLeft: 36,
        paddingVertical: 8,
        backgroundColor: "#fafafa",
        borderRadius: 8,
        marginBottom: 6,
    },
    contentText: {
        color: "#555",
        fontSize: 14,
    },
});
