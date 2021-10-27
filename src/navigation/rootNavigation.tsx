import React from 'react';
import HomeNavigation from './homeNavigation';
import SignupNavigation from './signupNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import SigninScreen from '../screens/auth/signin/Signin';
import signupNavigation from './signupNavigation';
import homeNavigation from './homeNavigation';
import { createNavigationContainerRef } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="resolveAuth"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="SignupFlow" component={signupNavigation} />
            <Stack.Screen name="HomeFlow" component={homeNavigation} />
        </Stack.Navigator>
    );
};

export default RootNavigation;
