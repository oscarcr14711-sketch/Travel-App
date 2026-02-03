import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import TicketsScreen from '../screens/TicketsScreen';
import TripsScreen from '../screens/TripsScreen';
import CompanionScreen from '../screens/CompanionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary.main,
                tabBarInactiveTintColor: colors.neutral.gray400,
                tabBarStyle: {
                    backgroundColor: colors.neutral.white,
                    borderTopWidth: 1,
                    borderTopColor: colors.light.border,
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 64,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
                }}
            />
            <Tab.Screen
                name="Tickets"
                component={TicketsScreen}
                options={{
                    tabBarLabel: 'Tickets',
                    tabBarIcon: ({ color }) => <TabIcon icon="🎫" color={color} />,
                }}
            />
            <Tab.Screen
                name="Trips"
                component={TripsScreen}
                options={{
                    tabBarLabel: 'Trips',
                    tabBarIcon: ({ color }) => <TabIcon icon="📅" color={color} />,
                }}
            />
            <Tab.Screen
                name="Companion"
                component={CompanionScreen}
                options={{
                    tabBarLabel: 'Companion',
                    tabBarIcon: ({ color }) => <TabIcon icon="🎒" color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

// Simple emoji-based icon component
const TabIcon = ({ icon, color }: { icon: string; color: string }) => {
    return (
        <Text style={{ fontSize: 24, color }}>
            {icon}
        </Text>
    );
};
