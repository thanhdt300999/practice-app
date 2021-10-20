import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as StoreProvider } from 'react-redux'
import { setNavigator } from './src/navigationRef';

import SignupScreen from './src/modules/auth/signup/components/SignUpScreen';
import SigninScreen from './src/modules/auth/signin/component/Signin'
import Discovery from './src/modules/Home/components/Discovery';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import redux from './src/config-redux/configureStore';

const switchNavigator = createSwitchNavigator({
    ResolveAuthScreen: ResolveAuthScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    Home: Discovery
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