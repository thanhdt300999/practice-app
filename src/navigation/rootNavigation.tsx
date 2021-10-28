import React from 'react';
import HomeNavigation from './homeNavigation';
import SignupNavigation from './signupNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import SigninScreen from '../screens/auth/signin/Signin';
import signupNavigation from './signupNavigation';
import homeNavigation from './homeNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config-redux/rootReducer';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const state = useSelector((state: RootState) => state.signin);
    return (
        <Stack.Navigator
            initialRouteName="resolveAuth"
            screenOptions={{
                headerShown: false,
            }}
        >
            {console.log(state.accessToken)}
            {/* <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} /> */}
            {state.accessToken === null ? (
                <>
                    <Stack.Screen name="Signin" component={SigninScreen} />
                    <Stack.Screen name="SignupFlow" component={signupNavigation} />
                </>
            ) : (
                <>
                    <Stack.Screen name="HomeFlow" component={homeNavigation} />
                </>
            )}
            {/* <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="SignupFlow" component={signupNavigation} />
            <Stack.Screen name="HomeFlow" component={homeNavigation} /> */}
        </Stack.Navigator>
    );
};

export default RootNavigation;
