import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const EditableField = ({
    label,
    value,
    type = "text",
    editable = true,
    options = [],
    onChange,
    onPress, // ✅ new prop for button
    required = false,
}) => {
    const showRequired = required && editable;
    const isEmpty = value === "" || value === null || value === undefined;

    return (
        <View style={{ marginBottom: 14 }}>
            {/* ✅ Label with Required Indicator */}
            <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>{label}</Text>
                {showRequired && <Text style={styles.requiredMark}>*</Text>}
            </View>

            {/* SELECT FIELD */}
            {type === "select" ? (
                <View
                    style={[
                        styles.pickerWrapper,
                        !editable && styles.fieldDisabled,
                        showRequired && isEmpty && styles.requiredBorder,
                    ]}
                >
                    <Picker selectedValue={value} onValueChange={onChange} enabled={editable}>
                        <Picker.Item label={`Select ${label}`} value="" />
                        {options.map((opt) => (
                            <Picker.Item key={opt.id} label={opt.title} value={opt.value} />
                        ))}
                    </Picker>
                </View>
            ) : type === "button" ? (
                /* ✅ BUTTON FIELD */
                <TouchableOpacity
                    style={[styles.buttonField]}
                    onPress={onPress}
                    activeOpacity={0.85}
                    // disabled={!editable}
                >
                    <Text style={styles.buttonText}>{`Select ${label}`}</Text>
                </TouchableOpacity>
            ) : (
                /* TEXT / INT FIELD */
                <TextInput
                    value={value?.toString() ?? ""}
                    editable={editable}
                    keyboardType={type === "int" ? "numeric" : "default"}
                    onChangeText={(text) =>
                        onChange(type === "int" ? Number(text) || 0 : text)
                    }
                    style={[
                        styles.fieldInput,
                        !editable && styles.fieldDisabled,
                        showRequired && !value && styles.requiredBorder,
                    ]}
                    placeholder={`Enter ${label}${showRequired ? " *" : ""}`}
                />
            )}
        </View>
    );
};

export default EditableField;

const styles = StyleSheet.create({
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    fieldLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
        textTransform: "uppercase",
    },
    requiredMark: {
        color: "#DC2626",
        marginLeft: 2,
        fontSize: 14,
        fontWeight: "700",
    },
    fieldInput: {
        height: 46,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        color: "#111827",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    fieldDisabled: {
        backgroundColor: "#F3F4F6",
        color: "#9CA3AF",
    },
    requiredBorder: {
        borderColor: "#DC2626",
    },
    /* ✅ Button Styles */
    buttonField: {
        height: 46,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    buttonDisabled: {
        backgroundColor: "#9CA3AF",
    },
});
