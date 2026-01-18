import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function TransportationSelectionScreen({ navigation, route }: any) {
    const { country } = route.params || { country: 'USA' };

    const handleTransportationSelect = (type: 'Airplane' | 'Bus') => {
        console.log(`Selected transportation: ${type} for ${country}`);

        if (type === 'Airplane') {
            navigation.navigate('AddFlightTrip', { country });
        } else if (type === 'Bus') {
            navigation.navigate('AddBusTrip', { country });
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Top Half - Airplane */}
            <TouchableOpacity
                style={[styles.half, styles.topHalf]}
                onPress={() => handleTransportationSelect('Airplane')}
                activeOpacity={0.9}
            >
                <View style={styles.buttonContent}>
                    <Text style={styles.emoji}>✈️</Text>
                    <Text style={styles.label}>Airplane</Text>
                </View>
            </TouchableOpacity>

            {/* Bottom Half - Bus */}
            <TouchableOpacity
                style={[styles.half, styles.bottomHalf]}
                onPress={() => handleTransportationSelect('Bus')}
                activeOpacity={0.9}
            >
                <View style={styles.buttonContent}>
                    <Text style={styles.emoji}>🚌</Text>
                    <Text style={styles.label}>Bus</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.neutral.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    backArrow: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    half: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topHalf: {
        backgroundColor: '#3B82F6', // Sky Blue for Airplane
        borderBottomWidth: 2,
        borderBottomColor: colors.neutral.white,
    },
    bottomHalf: {
        backgroundColor: '#10B981', // Green for Bus
        borderTopWidth: 2,
        borderTopColor: colors.neutral.white,
    },
    buttonContent: {
        alignItems: 'center',
        gap: spacing.lg,
    },
    emoji: {
        fontSize: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    label: {
        ...typography.styles.h2,
        fontSize: 48,
        fontWeight: '700',
        color: colors.neutral.white,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
});
