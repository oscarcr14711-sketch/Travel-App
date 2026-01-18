import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function HomeScreen({ navigation }: any) {
    const handleCountrySelect = (country: 'USA' | 'Mexico') => {
        console.log(`Selected country: ${country}`);
        // TODO: Navigate to main app flow based on country selection
        // navigation.navigate('MainApp', { country });
    };

    return (
        <View style={styles.container}>
            {/* Royal Blue Gradient Background */}
            <View style={styles.gradient} />

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    {/* FlyRide Logo */}
                    <Image
                        source={require('../assets/images/FlyRide Logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    {/* FlyRide Title */}
                    <Image
                        source={require('../assets/images/FlyRide title.png')}
                        style={styles.title}
                        resizeMode="contain"
                    />
                </View>

                {/* Country Selection Section */}
                <View style={styles.selectionContainer}>
                    <Text style={styles.instructionText}>Select Your Travel Country</Text>

                    <View style={styles.buttonContainer}>
                        {/* USA Button */}
                        <TouchableOpacity
                            style={styles.countryButton}
                            onPress={() => handleCountrySelect('USA')}
                            activeOpacity={0.8}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={styles.countryFlag}>🇺🇸</Text>
                                <Text style={styles.countryText}>USA</Text>
                            </View>
                            <View style={styles.buttonShadow} />
                        </TouchableOpacity>

                        {/* Mexico Button */}
                        <TouchableOpacity
                            style={styles.countryButton}
                            onPress={() => handleCountrySelect('Mexico')}
                            activeOpacity={0.8}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={styles.countryFlag}>🇲🇽</Text>
                                <Text style={styles.countryText}>Mexico</Text>
                            </View>
                            <View style={styles.buttonShadow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // Royal blue to lighter blue gradient
        backgroundColor: '#1E3A8A', // Royal Blue base
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
        paddingHorizontal: spacing.lg,
        backgroundColor: 'transparent',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: spacing['3xl'],
        gap: spacing.lg,
    },
    logo: {
        width: 180,
        height: 180,
    },
    title: {
        width: 300,
        height: 80,
    },
    selectionContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    instructionText: {
        ...typography.styles.h4,
        color: colors.neutral.white,
        marginBottom: spacing.xl,
        textAlign: 'center',
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    buttonContainer: {
        width: '100%',
        gap: spacing.md,
    },
    countryButton: {
        width: '100%',
        height: 70,
        marginBottom: spacing.sm,
    },
    buttonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9CA3AF', // Grayish base
        borderRadius: 16,
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        // 3D effect - top layer
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 8,
        // Border for 3D depth
        borderTopWidth: 2,
        borderTopColor: 'rgba(255, 255, 255, 0.4)',
        borderBottomWidth: 3,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    },
    buttonShadow: {
        position: 'absolute',
        bottom: -4,
        left: 4,
        right: 4,
        height: 70,
        backgroundColor: '#6B7280',
        borderRadius: 16,
        zIndex: -1,
        opacity: 0.6,
    },
    countryFlag: {
        fontSize: 32,
    },
    countryText: {
        ...typography.styles.h5,
        fontSize: 24,
        fontWeight: '700',
        color: colors.neutral.white,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
