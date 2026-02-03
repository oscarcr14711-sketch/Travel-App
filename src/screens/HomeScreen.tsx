import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function HomeScreen({ navigation }: any) {
    const handleCountrySelect = (country: 'USA' | 'Mexico') => {
        console.log(`Selected country: ${country}`);
        navigation.navigate('TransportationSelection', { country });
    };

    return (
        <View style={styles.container}>
            {/* Royal Blue Gradient Background */}
            <View style={styles.gradient} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
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
                    </View>
                </View>
            </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacing.xl,
        paddingBottom: 100, // Extra padding to ensure buttons are above tab bar (64px + spacing)
        paddingHorizontal: spacing.lg,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xl,
        gap: spacing.lg,
    },
    logo: {
        width: 240,
        height: 240,
    },
    title: {
        width: 650,
        height: 160,
    },
    selectionContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
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
        flexDirection: 'row',
        width: '100%',
        gap: spacing.md,
        justifyContent: 'center',
    },
    countryButton: {
        flex: 1,
        maxWidth: 110,
        height: 50,
    },
    buttonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9CA3AF', // Grayish base
        borderRadius: 16,
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
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
        height: 50,
        backgroundColor: '#6B7280',
        borderRadius: 16,
        zIndex: -1,
        opacity: 0.6,
    },
    countryFlag: {
        fontSize: 24,
    },
    countryText: {
        ...typography.styles.h5,
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral.white,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
