import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface SmartTimeInputProps {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
}

export default function SmartTimeInput({ value, onChangeText, label, placeholder = "HH:MM" }: SmartTimeInputProps) {

    const handleTextChange = (text: string) => {
        // Remove non-numeric characters
        const cleaned = text.replace(/[^0-9]/g, '');
        let formatted = cleaned;

        // Add colon automatically
        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
        }

        // Limit length
        if (formatted.length > 5) formatted = formatted.slice(0, 5);

        // Basic validation for hours
        if (cleaned.length >= 2) {
            const hours = parseInt(cleaned.slice(0, 2), 10);
            if (hours > 23) {
                // Logic to prevent invalid hours if desired, 
                // or just let user type and validate later.
                // For smooth typing, maybe just let it be.
            }
        }

        onChangeText(formatted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.neutral.gray400}
                value={value}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.styles.body,
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral.gray800,
        marginBottom: spacing.sm,
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
