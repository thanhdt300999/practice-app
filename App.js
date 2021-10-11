import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as StoreProvider } from 'react-redux'
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/modules/auth/component/HomeScreen';
import HomeComponent from './src/modules/Home/components/HomeComponent';
import redux from './src/config-redux/configureStore';

const switchNavigator = createSwitchNavigator({
  // ResolveAuth: ResolveAuthScreen,
  HomeScreen: HomeScreen,
  // Signin: SigninScreen,
  // loginFlow: createStackNavigator({
  //   HomeScreen: HomeScreen,
  // }),
  // mainFlow: createBottomTabNavigator({
  //   Home: HomeComponent,
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
