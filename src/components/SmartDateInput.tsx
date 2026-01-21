import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface SmartDateInputProps {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
}

export default function SmartDateInput({ value, onChangeText, label, placeholder = "MM/DD/YYYY" }: SmartDateInputProps) {

    const handleTextChange = (text: string) => {
        // Remove non-numeric characters
        const cleaned = text.replace(/[^0-9]/g, '');
        let formatted = cleaned;

        // Add slashes automatically
        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        if (cleaned.length > 4) {
            formatted = `${formatted.slice(0, 5)}/${cleaned.slice(4, 8)}`;
        }

        // Limit length
        if (formatted.length > 10) formatted = formatted.slice(0, 10);

        onChangeText(formatted);
    };

    const setToday = () => {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        onChangeText(`${mm}/${dd}/${yyyy}`);
    };

    const setTomorrow = () => {
        const tmrw = new Date();
        tmrw.setDate(tmrw.getDate() + 1);
        const mm = String(tmrw.getMonth() + 1).padStart(2, '0');
        const dd = String(tmrw.getDate()).padStart(2, '0');
        const yyyy = tmrw.getFullYear();
        onChangeText(`${mm}/${dd}/${yyyy}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.quickButtons}>
                    <TouchableOpacity onPress={setToday} style={styles.quickBtn}>
                        <Text style={styles.quickBtnText}>Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setTomorrow} style={styles.quickBtn}>
                        <Text style={styles.quickBtnText}>Tomorrow</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.neutral.gray400}
                value={value}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.styles.body,
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral.gray800,
    },
    quickButtons: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    quickBtn: {
        backgroundColor: colors.primary.light,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: 4,
    },
    quickBtnText: {
        ...typography.styles.bodySmall,
        fontSize: 10,
        color: colors.neutral.white,
        fontWeight: '600',
    },
    input: {
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: 12,
        padding: spacing.md,
        fontSize: 16,
        color: colors.neutral.gray800,
    },
});
