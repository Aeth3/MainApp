import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";

const { height, width } = Dimensions.get('window');

export default function Reel({ item, isActive }) {
    const [paused, setPaused] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.videoWrapper} activeOpacity={1} onPress={() => setPaused(!paused)}>
                <Video
                    source={{ uri: item.video }}
                    style={styles.video}
                    paused={!isActive || paused}
                    resizeMode="cover"
                    repeat
                />
            </TouchableOpacity>

            {/* Overlay UI */}
            <View style={styles.overlay}>
                {/* User section */}
                <View style={styles.userSection}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text style={styles.username}>{item.username}</Text>
                </View>

                {/* Description */}
                <Text style={styles.description}>{item.description}</Text>

                {/* Sidebar buttons */}
                <View style={styles.rightButtons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.icon}>❤️</Text>
                        <Text style={styles.iconText}>{item.likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.icon}>💬</Text>
                        <Text style={styles.iconText}>{item.comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.icon}>📤</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: '#000',
    },
    videoWrapper: {
        height: '100%',
        width: '100%',
    },
    video: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 60,
        left: 15,
        right: 15,
        justifyContent: 'space-between',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginRight: 10,
    },
    username: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
    },
    rightButtons: {
        position: 'absolute',
        right: 0,
        bottom: 20,
        alignItems: 'center',
    },
    iconButton: {
        marginBottom: 20,
        alignItems: 'center',
    },
    icon: {
        fontSize: 32,
        color: '#fff',
    },
    iconText: {
        color: '#fff',
        marginTop: 5,
        fontSize: 12,
    },
});