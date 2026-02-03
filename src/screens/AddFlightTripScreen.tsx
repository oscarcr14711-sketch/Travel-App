
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { createTrip } from '../services/firebase.service';
import { CabinClass } from '../types/trip.types';

import AutocompleteInput from '../components/AutocompleteInput';
import SmartDateInput from '../components/SmartDateInput';
import SmartTimeInput from '../components/SmartTimeInput';
import { AIRPORTS, Airport } from '../data/airports';
import { AIRLINES, Airline } from '../data/airlines';

export default function AddFlightTripScreen({ navigation, route }: any) {
    const { country } = route.params || { country: 'USA' };

    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [airline, setAirline] = useState('');
    const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveTrip = async () => {
        // Validate required fields
        if (!origin || !destination || !airline || !departureDate || !departureTime) {
            Alert.alert('Missing Information', 'Please fill in all required fields (Origin, Destination, Airline, Departure Date & Time)');
            return;
        }

        try {
            setLoading(true);

            await createTrip({
                type: 'flight',
                country,
                origin,
                destination,
                flightNumber,
                airline,
                cabinClass,
                departureDate,
                departureTime,
                arrivalDate: arrivalDate || departureDate,
                arrivalTime: arrivalTime || departureTime,
            });

            // Navigate back to trips screen
            navigation.navigate('Main', { screen: 'Trips', params: { refresh: true } });
        } catch (error) {
            console.error('Error saving trip:', error);
            Alert.alert('Error', 'Failed to save trip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderAirportItem = (item: Airport) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.code}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>{item.city} - {item.name}</Text>
        </View>
    );

    const renderAirlineItem = (item: Airline) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>{item.code}</Text>
        </View>
    );

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
                <Text style={styles.headerTitle}>Add Flight Trip ✈️</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Form Fields */}
                <View style={[styles.form, { zIndex: 10 }]}>
                    <View style={{ zIndex: 3 }}>
                        <AutocompleteInput
                            label="Origin"
                            placeholder="Type airport code or city (e.g., JFK)"
                            data={AIRPORTS}
                            value={origin}
                            onChangeText={setOrigin}
                            onSelect={(item: Airport) => setOrigin(item.city + ' (' + item.code + ')')}
                            filterKey="city"
                            displayKey="code"
                            renderItem={renderAirportItem}
                        />
                    </View>

                    <View style={{ zIndex: 2 }}>
                        <AutocompleteInput
                            label="Destination"
                            placeholder="Type airport code or city (e.g., LHR)"
                            data={AIRPORTS}
                            value={destination}
                            onChangeText={setDestination}
                            onSelect={(item: Airport) => setDestination(item.city + ' (' + item.code + ')')}
                            filterKey="city"
                            displayKey="code"
                            renderItem={renderAirportItem}
                        />
                    </View>

                    <View style={{ zIndex: 1 }}>
                        <AutocompleteInput
                            label="Airline"
                            placeholder="Type airline name (e.g., Delta)"
                            data={AIRLINES}
                            value={airline}
                            onChangeText={setAirline}
                            onSelect={(item: Airline) => setAirline(item.name)}
                            filterKey="name"
                            displayKey="name"
                            renderItem={renderAirlineItem}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Flight Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., DL1234"
                            placeholderTextColor={colors.neutral.gray400}
                            value={flightNumber}
                            onChangeText={setFlightNumber}
                        />
                    </View>

                    {/* Cabin Class Selector */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Cabin Class</Text>
                        <View style={styles.cabinClassContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.cabinClassButton,
                                    cabinClass === 'economy' && styles.cabinClassButtonActive
                                ]}
                                onPress={() => setCabinClass('economy')}
                            >
                                <Text style={styles.cabinClassIcon}>💺</Text>
                                <Text style={[
                                    styles.cabinClassText,
                                    cabinClass === 'economy' && styles.cabinClassTextActive
                                ]}>Economy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.cabinClassButton,
                                    cabinClass === 'premium_economy' && styles.cabinClassButtonActive
                                ]}
                                onPress={() => setCabinClass('premium_economy')}
                            >
                                <Text style={styles.cabinClassIcon}>✈️</Text>
                                <Text style={[
                                    styles.cabinClassText,
                                    cabinClass === 'premium_economy' && styles.cabinClassTextActive
                                ]}>Premium</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.cabinClassButton,
                                    cabinClass === 'business' && styles.cabinClassButtonActive
                                ]}
                                onPress={() => setCabinClass('business')}
                            >
                                <Text style={styles.cabinClassIcon}>🛫</Text>
                                <Text style={[
                                    styles.cabinClassText,
                                    cabinClass === 'business' && styles.cabinClassTextActive
                                ]}>Business</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.cabinClassButton,
                                    cabinClass === 'first' && styles.cabinClassButtonActive
                                ]}
                                onPress={() => setCabinClass('first')}
                            >
                                <Text style={styles.cabinClassIcon}>👑</Text>
                                <Text style={[
                                    styles.cabinClassText,
                                    cabinClass === 'first' && styles.cabinClassTextActive
                                ]}>First</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <SmartDateInput
                                label="Departure Date"
                                value={departureDate}
                                onChangeText={setDepartureDate}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <SmartTimeInput
                                label="Departure Time"
                                value={departureTime}
                                onChangeText={setDepartureTime}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <SmartDateInput
                                label="Arrival Date"
                                value={arrivalDate}
                                onChangeText={setArrivalDate}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.halfField]}>
                            <SmartTimeInput
                                label="Arrival Time"
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
        backgroundColor: '#3B82F6',
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
        backgroundColor: '#3B82F6',
        borderRadius: 16,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        marginTop: spacing.xl,
        shadowColor: '#3B82F6',
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
    cabinClassContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    cabinClassButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cabinClassButtonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
    },
    cabinClassIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    cabinClassText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6b7280',
    },
    cabinClassTextActive: {
        color: '#ffffff',
    },
    aircraftGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    aircraftChip: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    aircraftChipActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    aircraftChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6b7280',
    },
    aircraftChipTextActive: {
        color: '#ffffff',
    },
    aircraftHint: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 8,
        fontStyle: 'italic',
    },
});
