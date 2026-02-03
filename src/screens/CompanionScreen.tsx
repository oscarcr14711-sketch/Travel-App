import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../theme';

export default function CompanionScreen({ navigation }: any) {
    const handleARLuggage = () => {
        // Navigate to AR Luggage Scanner
        navigation.navigate('ARLuggage');
    };

    const handlePhotoJournal = () => {
        // Navigate to Photo Journal
        navigation.navigate('PhotoJournal');
    };

    const handleAirportMaps = () => {
        // Coming soon
        Alert.alert('Coming Soon!', 'Airport Maps & Guide will be available in a future update. 🗺️');
    };

    const renderFeatureCard = (
        icon: string,
        title: string,
        description: string,
        buttonText: string,
        onPress: () => void,
        comingSoon: boolean = false
    ) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{icon}</Text>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {!comingSoon && <Text style={styles.premiumBadge}>✨</Text>}
                </View>
            </View>
            <Text style={styles.cardDescription}>{description}</Text>
            <TouchableOpacity
                style={[
                    styles.actionButton,
                    comingSoon && styles.actionButtonDisabled
                ]}
                onPress={onPress}
                disabled={comingSoon}
            >
                <Text style={[
                    styles.actionButtonText,
                    comingSoon && styles.actionButtonTextDisabled
                ]}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1e3c72', '#2a5298']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>🎒 Travel Companion</Text>
                <Text style={styles.headerSubtitle}>Premium tools for smarter travel</Text>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Section: Smart Packing */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🧳 Smart Packing</Text>
                    {renderFeatureCard(
                        '📦',
                        'AR Luggage Scanner',
                        'Measure bag dimensions and estimate weight using your camera. Never worry about size limits again!',
                        'Try AR Scanner ✨',
                        handleARLuggage
                    )}
                </View>

                {/* Section: Travel Memories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📸 Travel Memories</Text>
                    {renderFeatureCard(
                        '📷',
                        'Photo Journal',
                        'AI-powered captions, organized timeline, and shareable highlight reels of your adventures.',
                        'Try Photo Journal ✨',
                        handlePhotoJournal
                    )}
                </View>

                {/* Section: Airport Navigator */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🗺️ Airport Navigator</Text>
                    {renderFeatureCard(
                        '📍',
                        'Airport Maps & Guide',
                        'Find restaurants, lounges, WiFi hotspots, power outlets, and more with interactive airport maps.',
                        'Coming Soon',
                        handleAirportMaps,
                        true
                    )}
                </View>

                {/* Bottom spacing */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e3c72',
        marginBottom: 12,
        paddingLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    cardTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    premiumBadge: {
        fontSize: 18,
    },
    cardDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
        marginBottom: 16,
    },
    actionButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    actionButtonDisabled: {
        backgroundColor: '#9CA3AF',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
            },
        }),
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    actionButtonTextDisabled: {
        color: '#E5E7EB',
    },
});
