import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, Modal } from "react-native";

const LoadingOverlayV3 = ({ visible, message = "Loading..." }) => {
    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        justifyContent: "center",
    },
    loaderBox: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
    },
    message: {
        marginTop: 12,
        fontSize: 15,
        color: "#111827",
        fontWeight: "600",
    },
});

export default LoadingOverlayV3;
