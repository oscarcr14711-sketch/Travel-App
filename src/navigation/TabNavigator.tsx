import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import TicketsScreen from '../screens/TicketsScreen';
import TripsScreen from '../screens/TripsScreen';
import CompanionScreen from '../screens/CompanionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tabBarActive,
                tabBarInactiveTintColor: theme.tabBarInactive,
                tabBarStyle: {
                    backgroundColor: theme.tabBarBackground,
                    borderTopWidth: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 75,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
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
        <Text style={{ fontSize: 26, color, opacity: 1 }}>
            {icon}
        </Text>
    );
};
