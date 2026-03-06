import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Home,
    Key,
    Lock,
    MessageSquare,
} from 'lucide-react-native';
import { bottomRoutes } from '../routes/bottomRoutes';

const Tab = createBottomTabNavigator();

// Icon map matching the design from image
const IconComponent = ({ name, color, size, focused }) => {
    const iconProps = {
        color: color,
        size: focused ? 28 : 24,
        strokeWidth: focused ? 2.5 : 2,
    };

    switch (name) {
        case 'Dashboard':
            return <Home {...iconProps} />;
        case 'Housekeeping':
            return <Key {...iconProps} />;
        case 'Front Office':
            return <Lock {...iconProps} />;
        case 'Messaging':
            return <MessageSquare {...iconProps} />;
        default:
            return <Home {...iconProps} />;
    }
};

export default function BottomNavigator({ paddingTop = 0 }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#16A085',
                tabBarInactiveTintColor: '#A0A0A0',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F0F0F0',
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 70,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                    marginTop: 4,
                },
                tabBarIcon: ({ focused, color }) => (
                    <IconComponent
                        name={route.name}
                        color={color}
                        focused={focused}
                    />
                ),
                tabBarLabel: route.name,
            })}
            initialRouteName="Dashboard"
            detachInactiveScreens={true}
            backBehavior="history"
        >
            {bottomRoutes.map((route) => (
                <Tab.Screen
                    key={route.name}
                    name={route.name}
                    getComponent={route.getComponent}
                    options={route.options}
                    initialParams={{ paddingTop }}
                />
            ))}
        </Tab.Navigator>
    );
}
