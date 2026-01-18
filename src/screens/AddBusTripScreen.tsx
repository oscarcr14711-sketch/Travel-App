import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { createTrip } from '../services/firebase.service';

export default function AddBusTripScreen({ navigation, route }: any) {
    const { country } = route.params || { country: 'USA' };

    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [busNumber, setBusNumber] = useState('');
    const [busCompany, setBusCompany] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveTrip = async () => {
        if (!origin || !destination || !busCompany || !departureDate || !departureTime) {
            Alert.alert('Missing Information', 'Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);
            await createTrip({
                type: 'bus',
                country,
                origin,
                destination,
                busNumber,
                busCompany,
                departureStation,
                arrivalStation,
                departureDate,
                departureTime,
                arrivalDate: arrivalDate || departureDate,
                arrivalTime: arrivalTime || departureTime,
            });
            navigation.navigate('Main', { screen: 'Trips', params: { refresh: true } });
        } catch (error) {
            console.error('Error saving trip:', error);
            Alert.alert('Error', 'Failed to save trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Bus Trip 🚌</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Form Fields */}
                <View style={styles.form}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Origin City</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., San Francisco"
                            placeholderTextColor={colors.neutral.gray400}
                            value={origin}
                            onChangeText={setOrigin}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Destination</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Los Angeles"
                            placeholderTextColor={colors.neutral.gray400}
                            value={destination}
                            onChangeText={setDestination}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Bus Company</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Greyhound, Megabus, FlixBus"
                            placeholderTextColor={colors.neutral.gray400}
                            value={busCompany}
                            onChangeText={setBusCompany}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Bus Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 1254 (Optional)"
                            placeholderTextColor={colors.neutral.gray400}
                            value={busNumber}
                            onChangeText={setBusNumber}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Departure Station</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Downtown Bus Terminal"
                            placeholderTextColor={colors.neutral.gray400}
                            value={departureStation}
                            onChangeText={setDepartureStation}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Arrival Station</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Main Street Station"
                            placeholderTextColor={colors.neutral.gray400}
                            value={arrivalStation}
                            onChangeText={setArrivalStation}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <Text style={styles.label}>Departure Date</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor={colors.neutral.gray400}
                                value={departureDate}
                                onChangeText={setDepartureDate}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <Text style={styles.label}>Departure Time</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="HH:MM"
                                placeholderTextColor={colors.neutral.gray400}
                                value={departureTime}
                                onChangeText={setDepartureTime}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <Text style={styles.label}>Arrival Date</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor={colors.neutral.gray400}
                                value={arrivalDate}
                                onChangeText={setArrivalDate}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <Text style={styles.label}>Arrival Time</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="HH:MM"
                                placeholderTextColor={colors.neutral.gray400}
                                value={arrivalTime}
                                onChangeText={setArrivalTime}
                            />
                        </View>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveTrip}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.saveButtonText}>Save Trip</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: spacing.lg,
        backgroundColor: '#10B981',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    backArrow: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.neutral.white,
    },
    headerTitle: {
        ...typography.styles.h3,
        fontSize: 24,
        fontWeight: '700',
        color: colors.neutral.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: 100,
    },
    form: {
        gap: spacing.lg,
    },
    fieldGroup: {
        gap: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    halfField: {
        flex: 1,
    },
    label: {
        ...typography.styles.body,
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral.gray800,
    },
    input: {
        backgroundColor: colors.light.surface,
        borderWidth: 1,
        borderColor: colors.light.border,
        borderRadius: 12,
        padding: spacing.md,
        fontSize: 16,
        color: colors.neutral.gray800,
    },
    saveButton: {
        backgroundColor: '#10B981',
        borderRadius: 16,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        marginTop: spacing.xl,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    saveButtonText: {
        ...typography.styles.h4,
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral.white,
    },
});
