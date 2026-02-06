import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import TransportationSelectionScreen from '../screens/TransportationSelectionScreen';
import AddFlightTripScreen from '../screens/AddFlightTripScreen';
import AddBusTripScreen from '../screens/AddBusTripScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import FlightAmenitiesScreen from '../screens/FlightAmenitiesScreen';
import BusAmenitiesScreen from '../screens/BusAmenitiesScreen';
import TravelStatsScreen from '../screens/TravelStatsScreen';
import ARLuggageScreen from '../screens/ARLuggageScreen';
import PhotoJournalScreen from '../screens/PhotoJournalScreen';
import TSASearchScreen from '../screens/TSASearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen
                    name="TransportationSelection"
                    component={TransportationSelectionScreen}
                />
                <Stack.Screen
                    name="AddFlightTrip"
                    component={AddFlightTripScreen}
                />
                <Stack.Screen
                    name="AddBusTrip"
                    component={AddBusTripScreen}
                />
                <Stack.Screen
                    name="TripDetail"
                    component={TripDetailScreen}
                />
                <Stack.Screen
                    name="FlightAmenities"
                    component={FlightAmenitiesScreen}
                />
                <Stack.Screen
                    name="BusAmenities"
                    component={BusAmenitiesScreen}
                />
                <Stack.Screen
                    name="TravelStats"
                    component={TravelStatsScreen}
                />
                <Stack.Screen
                    name="ARLuggage"
                    component={ARLuggageScreen}
                />
                <Stack.Screen
                    name="PhotoJournal"
                    component={PhotoJournalScreen}
                />
                <Stack.Screen
                    name="TSASearch"
                    component={TSASearchScreen}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

