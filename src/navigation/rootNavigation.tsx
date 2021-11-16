import React from 'react';
import HomeNavigation from './homeNavigation';
import SignupNavigation from './signupNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SigninScreen from '../screens/auth/signin/Signin';
import signupNavigation from './signupNavigation';
import homeNavigation from './homeNavigation';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions/signin.actions';
import { RootState } from '../redux/config-redux/rootReducer';
import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();
const message = () => {
    return (<FlashMessage position="top" />)
}
const RootNavigation = () => {
    const state = useSelector((state: RootState) => state.signin);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const readToken = async () => {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('token');
            setIsLoading(false);
            if (token) {
                dispatch(actions.setToken(token));
            }
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        readToken();
    }, []);
    if (isLoading === true) {
        return null;
    } else {
        return (
            <Stack.Navigator
                initialRouteName="resolveAuth"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {state.isLogged === false ? (
                    <>
                        <Stack.Screen name="Signin" component={SigninScreen} />
                        <Stack.Screen name="SignupFlow" component={signupNavigation} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="HomeFlow" component={homeNavigation} />
                    </>
                )}
            </Stack.Navigator>
        );
    }
};

export default RootNavigation;
