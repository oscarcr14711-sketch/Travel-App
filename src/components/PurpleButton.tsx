import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PurpleButtonProps {
    onPress: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    variant?: 'primary' | 'secondary';
}

export default function PurpleButton({
    onPress,
    title,
    style,
    textStyle,
    variant = 'primary'
}: PurpleButtonProps) {
    if (variant === 'secondary') {
        return (
            <TouchableOpacity
                style={[styles.secondaryButton, style]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <Text style={[styles.secondaryText, textStyle]}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#7C3AED', '#9333EA', '#6D28D9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
    },
    gradient: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
