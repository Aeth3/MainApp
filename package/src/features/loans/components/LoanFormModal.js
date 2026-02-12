import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, FONTS } from "package/src/legacyApp";

const LoanFormModal = ({
    visible,
    mode = "create",
    values,
    onChange,
    onCancel,
    onSubmit,
    saving = false,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());

    const update = (key, value) => {
        onChange((prev) => ({ ...prev, [key]: value }));
    };

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    const parseDate = (value) => {
        if (!value) return new Date();
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    useEffect(() => {
        if (visible) {
            setDateValue(parseDate(values?.dueDate));
        }
    }, [visible, values?.dueDate]);

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS !== "ios") {
            setShowDatePicker(false);
        }
        if (event?.type === "dismissed") return;

        const nextDate = selectedDate || dateValue;
        setDateValue(nextDate);
        update("dueDate", formatDate(nextDate));
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.sheet}
                >
                    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                        <Text style={styles.title}>{mode === "edit" ? "Edit Loan" : "New Loan"}</Text>

                        <View style={styles.field}>
                            <Text style={styles.label}>Borrower</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter borrower name"
                                placeholderTextColor={COLORS.textLight}
                                value={values.borrower}
                                onChangeText={(text) => update("borrower", text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Amount</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0.00"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                value={values.amount}
                                onChangeText={(text) => update("amount", text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Due Date</Text>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={styles.dateInput}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        !values.dueDate && styles.placeholderText,
                                    ]}
                                >
                                    {values.dueDate || "YYYY-MM-DD"}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={dateValue}
                                    mode="date"
                                    display={Platform.OS === "ios" ? "inline" : "calendar"}
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Status</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="pending"
                                placeholderTextColor={COLORS.textLight}
                                value={values.status}
                                onChangeText={(text) => update("status", text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Term (optional)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 12"
                                placeholderTextColor={COLORS.textLight}
                                keyboardType="numeric"
                                value={values.term}
                                onChangeText={(text) => update("term", text)}
                            />
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onCancel}
                                disabled={saving}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.saveButton, saving && { opacity: 0.7 }]}
                                onPress={onSubmit}
                                disabled={saving}
                            >
                                <Text style={styles.saveText}>{saving ? "Saving..." : "Save"}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 16,
        maxHeight: "90%",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    title: {
        ...FONTS.h4,
        color: COLORS.title,
        marginBottom: 14,
    },
    field: {
        marginBottom: 12,
    },
    label: {
        ...FONTS.fontSm,
        color: COLORS.text,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
        color: COLORS.text,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
        justifyContent: "center",
    },
    dateText: {
        ...FONTS.fontSm,
        color: COLORS.text,
    },
    placeholderText: {
        color: COLORS.textLight,
    },
    actions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    button: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButton: {
        backgroundColor: "#E5E7EB",
    },
    saveButton: {
        backgroundColor: COLORS.primary,
    },
    cancelText: {
        ...FONTS.fontSm,
        color: COLORS.text,
    },
    saveText: {
        ...FONTS.fontSm,
        color: COLORS.white,
    },
});

export default LoanFormModal;
