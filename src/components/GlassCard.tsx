import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface GlassCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function GlassCard({ children, style }: GlassCardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        padding: 16,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
});
