import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import TransportationSelectionScreen from '../screens/TransportationSelectionScreen';
import AddFlightTripScreen from '../screens/AddFlightTripScreen';
import AddBusTripScreen from '../screens/AddBusTripScreen';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
