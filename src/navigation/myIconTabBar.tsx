import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const MessageIcon = ({ color, focused }) => {
    return (
        <View
            style={[
                styles.parentView,
                { borderBottomWidth: 3, borderBottomColor: focused ? 'red' : 'transparent' },
            ]}
        >
            <AntDesign name="message1" size={20} color={color} />
            <View
                style={styles.message}
            >
                <Text style={{ fontSize: 10, color: '#fff' }}>1</Text>
            </View>
        </View>
    );
};
export const DiscoveryIcon = ({ color, focused }) => {
    return (
        <View
            style={[
                styles.parentView,
                { borderBottomWidth: 3, borderBottomColor: focused ? 'red' : 'transparent' },
            ]}
        >
            <Feather name="search" size={20} color={color} />
        </View>
    );
};
export const NotificationIcon = ({ color, focused }) => {
    return (
        <View
            style={[
                styles.parentView,
                { borderBottomWidth: 3, borderBottomColor: focused ? 'red' : 'transparent' },
            ]}
        >
            <Ionicons name="notifications-outline" size={20} color={color} />
        </View>
    );
};
export const UserIcon = ({ color, focused }) => {
    return (
        <View
            style={[
                styles.parentView,
                { borderBottomWidth: 3, borderBottomColor: focused ? 'red' : 'transparent' },
            ]}
        >
            <AntDesign name="user" size={20} color={color} />
        </View>
    );
};
export const EntityIcon = ({ color, focused }) => {
    return (
        <View
            style={[
                styles.parentView,
                { borderBottomWidth: 3, borderBottomColor: focused ? 'red' : 'transparent' },
            ]}
        >
           <FontAwesome name="intersex" size={20} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    parentView: {
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        position: 'absolute',
        backgroundColor: '#2baeff',
        height: 13,
        width: 9,
        borderRadius: 2,
        top: 2,
        right: 12,
        alignItems: 'center',
    }
});
