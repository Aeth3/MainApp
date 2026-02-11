import React from "react";
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage, faSmile } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../theme/Theme";

export default function PostComposer({ avatarUri, onImagePress, onTextChange, containerStyle, profileStyle, textFieldStyle, uploadStyle, imageIcon, iconSize, iconColor }) {
    const { colors } = useTheme()
    return (
        <View
            style={[styles.container, containerStyle]}
        >
            {/* 🧑‍🦱 User Avatar */}
            <Image
                source={{
                    uri:
                        avatarUri ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
                style={[styles.profile, profileStyle]}
            />

            {/* 💬 Input Field */}
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder="What's on your mind?"
                    placeholderTextColor="#888"
                    onChangeText={onTextChange}
                    multiline
                    style={[styles.textField, textFieldStyle]}
                />
            </View>

            {/* 🖼️ Image Upload Icon */}
            <TouchableOpacity
                onPress={onImagePress}
                style={[styles.upload, uploadStyle]}
            >
                <FontAwesomeIcon icon={imageIcon || faImage} size={iconSize || 18} color={iconColor || "#3b82f6"} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        borderTopWidth: 1,
        borderColor: "#aaa"
    },
    profile: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    textField: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 6,
        maxHeight: 100,
    },
    upload: {
        marginLeft: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 50,
        padding: 10,
    }
})