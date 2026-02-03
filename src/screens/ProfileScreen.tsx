import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function ProfileScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>👤 Profile</Text>
                <Text style={styles.subtitle}>Settings & preferences</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Travel Stats Menu Item */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Travel</Text>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('TravelStats')}
                    >
                        <Text style={styles.menuText}>📊 My Travel Stats</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuText}>Sign In</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Settings</Text>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuText}>Notifications</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuText}>Language</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuText}>About</Text>
                    </View>
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
        backgroundColor: colors.secondary.main,
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
    section: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
        ...typography.styles.caption,
        color: colors.light.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: spacing.sm,
    },
    menuItem: {
        backgroundColor: colors.neutral.white,
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    menuText: {
        ...typography.styles.body,
        color: colors.light.text,
        flex: 1,
    },
    menuArrow: {
        fontSize: 24,
        color: colors.light.textSecondary,
        fontWeight: '300',
    },
});
