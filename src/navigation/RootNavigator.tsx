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
import AirportMapsScreen from '../screens/AirportMapsScreen';
import BusTerminalMapsScreen from '../screens/BusTerminalMapsScreen';
import ScanTicketScreen from '../screens/ScanTicketScreen';
import PackingListScreen from '../screens/PackingListScreen';
import DocumentVaultScreen from '../screens/DocumentVaultScreen';
import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import BoardingPassScreen from '../screens/BoardingPassScreen';

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
                <Stack.Screen
                    name="AirportMaps"
                    component={AirportMapsScreen}
                />
                <Stack.Screen
                    name="BusTerminalMaps"
                    component={BusTerminalMapsScreen}
                />
                <Stack.Screen
                    name="ScanTicket"
                    component={ScanTicketScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PackingList"
                    component={PackingListScreen}
                />
                <Stack.Screen
                    name="DocumentVault"
                    component={DocumentVaultScreen}
                />
                <Stack.Screen
                    name="CurrencyConverter"
                    component={CurrencyConverterScreen}
                />
                <Stack.Screen
                    name="PdfViewer"
                    component={PdfViewerScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BoardingPass"
                    component={BoardingPassScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

