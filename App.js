import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as StoreProvider } from 'react-redux'
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import LogIn from './src/modules/auth/component/LogIn';
import SigninScreen from './src/modules/Home/components/SignUpScreen';
import BirthdayForm from './src/modules/Home/components/BirthdayForm';


import redux from './src/config-redux/configureStore';

const switchNavigator = createSwitchNavigator({
  // ResolveAuth: ResolveAuthScreen,
  // LogIn: LogIn,
  // Signin: SigninScreen,
  // loginFlow: createStackNavigator({
  // HomeScreen: HomeScreen,
  // }),
  // mainFlow: createBottomTabNavigator({
  Home: SigninScreen,
  //   // Account: AccountScreen,
  // }),
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
