import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as StoreProvider } from 'react-redux'
import { setNavigator } from './src/navigationRef';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, Feather, AntDesign, Ionicons } from 'react-native-vector-icons';
import SignupScreen from './src/modules/auth/signup/components/SignUpScreen';
import SigninScreen from './src/modules/auth/signin/component/Signin'
import Discovery from './src/modules/Home/components/Discovery';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import Message from './src/modules/Home/components/Message';
import redux from './src/config-redux/configureStore';
import NotificationScreen from './src/modules/Home/components/NotificationScreen';
import UserScreen from './src/modules/Home/components/UserScreen';
import Entity from './src/modules/Home/components/Entity';
import { TouchableOpacity, View } from 'react-native';
import NavigationService from './NavigationService';
const switchNavigator = createSwitchNavigator({
    ResolveAuthScreen: ResolveAuthScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    homeFlow: createBottomTabNavigator({
        Home: {
            screen: Discovery,
            navigationOptions: {
                tabBarLabel: "Home Page",
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Feather name="search" size={30} color={tintColor} />
                )
            },
        },
        Entity: {
            screen: Entity,
            navigationOptions: {
                tabBarLabel: "Home Page",
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="intersex" size={30} color={tintColor} />
                )
            },
        },
        Message: {
            screen: Message,
            navigationOptions: {
                tabBarLabel: "Home Page",
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name="message1" size={30} color={tintColor} />
                )
            },
        },
        Notification: {
            screen: NotificationScreen,
            navigationOptions: {
                tabBarLabel: "Home Page",
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="notifications-outline" size={30} color={tintColor} />
                )
            },
        },
        User: {
            screen: UserScreen,
            navigationOptions: {
                tabBarLabel: "Home Page",
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name="user" size={30} color={tintColor} />
                )

            },
        },
    }, {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'blue',
            inactiveTintColor: 'grey',
        }
    })

});

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <StoreProvider store={redux.store}>
            <App
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        </StoreProvider>
    );
};