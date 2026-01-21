import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Keyboard } from 'react-native';
import { colors, typography, spacing } from '../theme';

interface AutocompleteProps {
    data: any[];
    value: string;
    onChangeText: (text: string) => void;
    onSelect: (item: any) => void;
    placeholder?: string;
    label: string;
    filterKey?: string; // Key to filter by (e.g., 'name', 'city')
    displayKey?: string; // Key to display in list (e.g., 'name')
    renderItem?: (item: any) => React.ReactNode;
}

export default function AutocompleteInput({
    data,
    value,
    onChangeText,
    onSelect,
    placeholder,
    label,
    filterKey = 'name',
    displayKey = 'name',
    renderItem
}: AutocompleteProps) {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleTextChange = (text: string) => {
        onChangeText(text);
        if (text.length > 0) {
            const filtered = data.filter(item => {
                const itemValue = item[filterKey]?.toString().toLowerCase();
                // Also check secondary key if it exists (e.g. check code and city)
                const secondaryValue = item['code']?.toString().toLowerCase();
                const tertiaryValue = item['city']?.toString().toLowerCase();

                const search = text.toLowerCase();
                return itemValue?.includes(search) ||
                    secondaryValue?.includes(search) ||
                    tertiaryValue?.includes(search);
            });
            setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (item: any) => {
        onSelect(item);
        setShowSuggestions(false);
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.neutral.gray400}
                    value={value}
                    onChangeText={handleTextChange}
                    onFocus={() => value.length > 0 && setShowSuggestions(true)}
                />

                {showSuggestions && suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.suggestionItem}
                                onPress={() => handleSelect(item)}
                            >
                                {renderItem ? renderItem(item) : (
                                    <Text style={styles.suggestionText}>
                                        {item[displayKey]}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
        zIndex: 1, // Ensure dropdown appears above other elements
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
    suggestionsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: colors.neutral.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.light.border,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1000,
    },
    suggestionItem: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.border,
    },
    suggestionText: {
        ...typography.styles.body,
        color: colors.neutral.gray800,
    },
});
