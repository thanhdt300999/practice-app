import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Discovery from '../screens/home/Discovery';
import Entity from '../screens/home/Entity';
import Message from '../screens/home/Message';
import NotificationScreen from '../screens/home/NotificationScreen';
import UserScreen from '../screens/home/UserScreen';

const Tab = createBottomTabNavigator();

export default function homeNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Discovery"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: '#ccc',
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Discovery"
                component={Discovery}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="search" size={30} color={color} />,
                }}
            />
            <Tab.Screen
                name="Entity"
                component={Entity}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="intersex" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Message"
                component={Message}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="message1" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="notifications-outline" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
