import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { colors, typography, spacing } from '../theme';
import { createTrip } from '../services/firebase.service';
import { scheduleAllTripNotifications } from '../services/notifications.service';
import SmartDateInput from '../components/SmartDateInput';
import SmartTimeInput from '../components/SmartTimeInput';

import AutocompleteInput from '../components/AutocompleteInput';
import { CITIES, City } from '../data/cities';
import { BUS_COMPANIES, BusCompany } from '../data/airlines';
import { getBusInfoForCompany } from '../data/bus-company-mappings';

export default function AddBusTripScreen({ navigation, route }: any) {
    const { country } = route.params || { country: 'USA' };

    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');
    const [busNumber, setBusNumber] = useState('');
    const [busCompany, setBusCompany] = useState('');
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveTrip = async () => {
        if (!origin || !destination || !busCompany || !departureDate || !departureTime) {
            Alert.alert('Missing Information', 'Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);

            // Get bus model and service class based on company
            const busInfo = getBusInfoForCompany(busCompany);

            const tripData = {
                type: 'bus',
                country,
                origin,
                destination,
                busNumber,
                busCompany,
                busModel: busInfo?.busModel,
                busServiceClass: busInfo?.busServiceClass,
                departureStation,
                arrivalStation,
                departureDate,
                departureTime,
                arrivalDate: arrivalDate || departureDate,
                arrivalTime: arrivalTime || departureTime,
            };

            const newTrip = await createTrip(tripData);

            // Schedule all trip notifications
            await scheduleAllTripNotifications({
                ...tripData,
                id: newTrip.id
            });

            navigation.navigate('Main', { screen: 'Trips', params: { refresh: true } });
        } catch (error) {
            console.error('Error saving trip:', error);
            Alert.alert('Error', 'Failed to save trip');
        } finally {
            setLoading(false);
        }
    };

    const renderCityItem = (item: City) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>{item.state ? `${item.state}, ` : ''}{item.country}</Text>
        </View>
    );

    const renderBusCompanyItem = (item: BusCompany) => (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
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
                <Text style={styles.headerTitle}>Add Bus Trip 🚌</Text>
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
                            label="Origin City"
                            placeholder="Type city name (e.g., San Francisco)"
                            data={CITIES}
                            value={origin}
                            onChangeText={setOrigin}
                            onSelect={(item: City) => setOrigin(item.name)}
                            filterKey="name"
                            displayKey="name"
                            renderItem={renderCityItem}
                        />
                    </View>

                    <View style={{ zIndex: 2 }}>
                        <AutocompleteInput
                            label="Destination"
                            placeholder="Type city name (e.g., Los Angeles)"
                            data={CITIES}
                            value={destination}
                            onChangeText={setDestination}
                            onSelect={(item: City) => setDestination(item.name)}
                            filterKey="name"
                            displayKey="name"
                            renderItem={renderCityItem}
                        />
                    </View>

                    <View style={{ zIndex: 1 }}>
                        <AutocompleteInput
                            label="Bus Company"
                            placeholder="Type bus company (e.g., Greyhound)"
                            data={BUS_COMPANIES}
                            value={busCompany}
                            onChangeText={setBusCompany}
                            onSelect={(item: BusCompany) => setBusCompany(item.name)}
                            filterKey="name"
                            displayKey="name"
                            renderItem={renderBusCompanyItem}
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
