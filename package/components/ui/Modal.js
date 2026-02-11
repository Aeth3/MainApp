import React, { useEffect, useRef } from "react"
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native"

const { height } = Dimensions.get("window")

export default function CustomModal({
    visible,
    title,
    message,
    onClose,
    onConfirm,
    confirmText = "OK",
    cancelText = "Cancel",
    showCancel = true,
    children,
    placement = "bottom", // "top", "center", "bottom"
    confirmButtonColor = "#1877f2"
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current

    // Determine target Y position based on placement
    const getTargetPosition = () => {
        switch (placement) {
            case "top":
                return 50; // distance from top
            case "center":
                return height / 2 - 150; // adjust based on modal height
            case "bottom":
            default:
                return 0; // bottom
        }
    }

    // Determine initial slide value based on placement
    const getInitialSlideValue = () => {
        switch (placement) {
            case "top":
                return -height; // slide down from above
            case "center":
                return height; // slide up from bottom
            case "bottom":
            default:
                return height; // slide up from bottom
        }
    }

    const slideAnim = useRef(new Animated.Value(
        placement === "top" ? -height : placement === "bottom" ? height : 0
    )).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        if (placement !== "center") {
            Animated.timing(slideAnim, {
                toValue: visible ? getTargetPosition() : getInitialSlideValue(),
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // Set container alignment based on placement
    const containerStyle = {
        justifyContent:
            placement === "top"
                ? "flex-start"
                : placement === "center"
                    ? "center"
                    : "flex-end",
    }

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[
                        styles.modalContainer,
                        { justifyContent: placement === "top" ? "flex-start" : placement === "center" ? "center" : "flex-end" },
                        placement === "center" ? {} : { transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <View style={[styles.modalCard, { maxHeight: height * 0.8 }]}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled
                        >
                            

                            {message ? <Text style={styles.message}>{message}</Text> : children}


                        </ScrollView>
                        <View style={styles.buttonRow}>
                            {showCancel && (
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                    <Text style={[styles.buttonText, { color: "#606770" }]}>{cancelText}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                                <Text style={[styles.buttonText, { color: confirmButtonColor }]}>{confirmText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        flex: 1,
    },
    modalCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        marginVertical: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#050505",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        fontSize: 15,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 10,
    },
    button: {
        marginLeft: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    cancelButton: {},
    confirmButton: {},
})
