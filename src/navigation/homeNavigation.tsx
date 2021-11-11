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
import { StyleSheet, Text, View } from 'react-native';
import { DiscoveryIcon, UserIcon, MessageIcon, NotificationIcon, EntityIcon } from './myIconTabBar';
const Tab = createBottomTabNavigator();
export default function homeNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Discovery"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Discovery"
                component={Discovery}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <DiscoveryIcon focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Entity"
                component={Entity}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <EntityIcon focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Message"
                component={Message}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <MessageIcon focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <NotificationIcon focused={focused} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <UserIcon focused={focused} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
