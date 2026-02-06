import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemeMode } from '../theme/themes';
import StarryBackground from '../components/StarryBackground';

export default function SettingsScreen({ navigation }: any) {
    const { themeMode, setThemeMode } = useTheme();

    const handleThemeSelect = (mode: ThemeMode) => {
        setThemeMode(mode);
    };

    const renderThemeOption = (
        mode: ThemeMode,
        icon: string,
        title: string,
        description: string
    ) => {
        const isSelected = themeMode === mode;

        return (
            <TouchableOpacity
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => handleThemeSelect(mode)}
                activeOpacity={0.7}
            >
                <View style={styles.optionHeader}>
                    <Text style={styles.optionIcon}>{icon}</Text>
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>{title}</Text>
                        <Text style={styles.optionDescription}>{description}</Text>
                    </View>
                    {isSelected && (
                        <View style={styles.checkmark}>
                            <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <StarryBackground>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>⚙️ Settings</Text>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Theme Preferences</Text>
                        <Text style={styles.sectionSubtitle}>
                            Choose how FlyRide looks throughout the day
                        </Text>

                        {renderThemeOption(
                            'day',
                            '☀️',
                            'Day Theme',
                            'Bright and vibrant with mountain scenery'
                        )}

                        {renderThemeOption(
                            'night',
                            '🌙',
                            'Night Theme',
                            'Dark mode with space background'
                        )}

                        {renderThemeOption(
                            'auto',
                            '🔄',
                            'Automatic',
                            'Switches to day at 7 AM, night at 7 PM'
                        )}
                    </View>

                    {/* Bottom spacing */}
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        </StarryBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    backButtonText: {
        fontSize: 28,
        color: '#ffffff',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
    },
    optionCard: {
        backgroundColor: 'rgba(30, 35, 60, 0.7)',
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    optionCardSelected: {
        backgroundColor: 'rgba(107, 95, 204, 0.4)',
        borderColor: '#7c6fdd',
        shadowColor: '#7c6fdd',
        shadowOpacity: 0.5,
        elevation: 8,
    },
    optionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        fontSize: 32,
        marginRight: 14,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 18,
    },
    checkmark: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#7c6fdd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '700',
    },
});
