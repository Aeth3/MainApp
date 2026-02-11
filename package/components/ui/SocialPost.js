import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faThumbsUp,
    faComment,
    faShare,
    faCheckCircle,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function SocialPost({
    profileImage,
    name,
    verified,
    time,
    caption,
    postImage,
    reactions,
    comments,
    shares,
    views,
}) {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: profileImage }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.name}>{name}</Text>
                        {verified && (
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                color="#1877F2"
                                size={14}
                                style={{ marginLeft: 4 }}
                            />
                        )}
                    </View>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>⋯</Text>
                </TouchableOpacity>
            </View>

            {/* Caption */}
            <Text style={styles.caption}>{caption}</Text>

            {/* Post Image/Video */}
            <View style={styles.mediaContainer}>
                <Image source={{ uri: postImage }} style={styles.postImage} />
                <View style={styles.playButton}>
                    <FontAwesomeIcon icon={faPlayCircle} size={40} color="white" />
                </View>
            </View>

            {/* Stats */}
            <View style={styles.stats}>
                <Text style={styles.statText}>😂😲 {reactions}</Text>
                <Text style={styles.statText}>
                    {comments} comments • {shares} shares • {views} views
                </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesomeIcon icon={faThumbsUp} color="#666" size={18} />
                    <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesomeIcon icon={faComment} color="#666" size={18} />
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesomeIcon icon={faShare} color="#666" size={18} />
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginVertical: 1,
        paddingVertical: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: 15,
    },
    time: {
        color: "#666",
        fontSize: 12,
    },
    caption: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
    },
    mediaContainer: {
        position: "relative",
    },
    postImage: {
        width: "100%",
        height: 300,
    },
    playButton: {
        position: "absolute",
        top: "45%",
        left: "45%",
        opacity: 0.9,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statText: {
        color: "#666",
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginHorizontal: 10,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 5,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    actionText: {
        color: "#666",
        marginLeft: 4,
        fontSize: 13,
    },
});
