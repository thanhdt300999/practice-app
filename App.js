import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as StoreProvider } from 'react-redux'
import { setNavigator } from './src/navigationRef';

import SignupScreen from './src/modules/Home/components/SignUpScreen';
import SigninScreen from './src/modules/auth/component/Signin'

import redux from './src/config-redux/configureStore';

const switchNavigator = createSwitchNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
});

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <StoreProvider store={redux.store}>
            <App
                ref={(navigator) => {
                    setNavigator(navigator);
                }}
            />
        </StoreProvider>
    );
};