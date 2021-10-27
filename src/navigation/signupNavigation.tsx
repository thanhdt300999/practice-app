import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntityScreen from '../screens/auth/signup/EntityScreen';
import BirthdayScreen from '../screens/auth/signup/BirthdayScreen';
import OriginScreen from '../screens/auth/signup/OriginScreen';
import FromScreen from '../screens/auth/signup/FromScreen';
import CountryScreen from '../screens/auth/signup/CountryScreen';
import ZipcodeScreen from '../screens/auth/signup/ZipcodeScreen';
import RegionScreen from '../screens/auth/signup/RegionScreen';
import CityScreen from '../screens/auth/signup/CityScreen';
import SignupScreen from '../screens/auth/signup/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function signupNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="Entity"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Entity" component={EntityScreen} />
            <Stack.Screen name="Birthday" component={BirthdayScreen} />
            <Stack.Screen name="Origin" component={OriginScreen} />
            <Stack.Screen name="From" component={FromScreen} />
            <Stack.Screen name="Country" component={CountryScreen} />
            <Stack.Screen name="Zipcode" component={ZipcodeScreen} />
            <Stack.Screen name="Region" component={RegionScreen} />
            <Stack.Screen name="City" component={CityScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}
