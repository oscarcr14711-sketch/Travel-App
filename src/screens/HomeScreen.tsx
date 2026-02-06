import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../components/StarryBackground';
import { colors, typography, spacing } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }: any) {
    const { theme } = useTheme();

    const handleCountrySelect = (country: 'USA' | 'Mexico') => {
        console.log(`Selected country: ${country}`);
        navigation.navigate('TransportationSelection', { country });
    };

    return (
        <StarryBackground>
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
                    <Text style={[styles.instructionText, { color: theme.headerText }]}>Select Your Travel Country</Text>

                    <View style={styles.buttonContainer}>
                        {/* Mexico Button */}
                        <TouchableOpacity
                            style={styles.countryButton}
                            onPress={() => handleCountrySelect('Mexico')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#5dc7bf', '#4db8b0', '#3da39c']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.buttonGradient}
                            >
                                {/* Glossy highlight overlay */}
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)', 'transparent']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 0.5 }}
                                    style={styles.glossOverlay}
                                />
                                <View style={styles.buttonContent}>
                                    <Text style={styles.countryFlag}>🇲🇽</Text>
                                    <Text style={styles.countryText}>Mexico</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* USA Button */}
                        <TouchableOpacity
                            style={styles.countryButton}
                            onPress={() => handleCountrySelect('USA')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#7c6fdd', '#6b5fcc', '#5a4ebb']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.buttonGradient}
                            >
                                {/* Glossy highlight overlay */}
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)', 'transparent']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 0.5 }}
                                    style={styles.glossOverlay}
                                />
                                <View style={styles.buttonContent}>
                                    <Text style={styles.countryFlag}>🇺🇸</Text>
                                    <Text style={styles.countryText}>USA</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </StarryBackground>
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
        width: 280,
        height: 280,
    },
    title: {
        width: 700,
        height: 210,
    },
    selectionContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
    instructionText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: spacing.xl,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: spacing.md,
        justifyContent: 'center',
    },
    countryButton: {
        flex: 1,
        maxWidth: 165,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    glossOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    buttonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    countryFlag: {
        fontSize: 24,
    },
    countryText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
});
