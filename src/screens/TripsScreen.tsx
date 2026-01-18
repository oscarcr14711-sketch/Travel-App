import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function TripsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>📅 My Trips</Text>
                <Text style={styles.subtitle}>Smart itinerary & timeline</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🗺️</Text>
                    <Text style={styles.emptyTitle}>No trips planned</Text>
                    <Text style={styles.emptyText}>
                        Create your first trip to get started
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light.background,
    },
    header: {
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
        backgroundColor: colors.travel.hotel,
    },
    title: {
        ...typography.styles.h3,
        color: colors.neutral.white,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.styles.bodySmall,
        color: colors.neutral.white,
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing['4xl'],
        paddingHorizontal: spacing.xl,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        ...typography.styles.h4,
        color: colors.light.text,
        marginBottom: spacing.sm,
    },
    emptyText: {
        ...typography.styles.body,
        color: colors.light.textSecondary,
        textAlign: 'center',
    },
});
