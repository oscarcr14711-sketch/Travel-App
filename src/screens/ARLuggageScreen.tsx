import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

export default function ARLuggageScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1e3c72', '#2a5298']}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>📦 AR Luggage Scanner</Text>
                <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>✨ Premium</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Premium Feature Card */}
                <View style={styles.featureCard}>
                    <Text style={styles.icon}>📦</Text>
                    <Text style={styles.title}>AR Luggage Measurement</Text>
                    <Text style={styles.description}>
                        Use your camera to measure bag dimensions and estimate weight with augmented reality technology.
                    </Text>

                    <View style={styles.featuresList}>
                        <FeatureItem text="📏 Measure length, width, height" />
                        <FeatureItem text="⚖️ Estimate weight using AR" />
                        <FeatureItem text="✅ Check airline size limits" />
                        <FeatureItem text="💼 Save measurements for multiple bags" />
                        <FeatureItem text="📊 Compare with airline requirements" />
                    </View>

                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeButtonText}>Unlock Premium - 7 Days Free</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.learnMoreButton}>
                        <Text style={styles.learnMoreText}>Learn More About Premium</Text>
                    </TouchableOpacity>
                </View>

                {/* How It Works */}
                <View style={styles.howItWorksCard}>
                    <Text style={styles.sectionTitle}>How It Works</Text>
                    <StepItem number="1" text="Point your camera at your luggage" />
                    <StepItem number="2" text="AR guides help you scan dimensions" />
                    <StepItem number="3" text="Get instant measurements & weight estimate" />
                    <StepItem number="4" text="Compare with your airline's limits" />
                </View>
            </ScrollView>
        </View>
    );
}

const FeatureItem = ({ text }: { text: string }) => (
    <View style={styles.featureItem}>
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const StepItem = ({ number, text }: { number: string; text: string }) => (
    <View style={styles.stepItem}>
        <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        <Text style={styles.stepText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 12,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    premiumBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    premiumText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    featureCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    icon: {
        fontSize: 64,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    featuresList: {
        width: '100%',
        marginBottom: 24,
    },
    featureItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    featureText: {
        fontSize: 15,
        color: '#444',
    },
    upgradeButton: {
        width: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    upgradeButtonText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
    },
    learnMoreButton: {
        paddingVertical: 12,
    },
    learnMoreText: {
        fontSize: 15,
        color: '#3B82F6',
        fontWeight: '600',
    },
    howItWorksCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    stepNumberText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: '#444',
    },
});
