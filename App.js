import React from 'react';
import type { Node } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux'
import redux from './src/redux/config-redux/configureStore';
import RootNavigation from './src/navigation/rootNavigation';
import { navigationRef } from './src/navigation/NavigationService';
const Stack = createNativeStackNavigator();
function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}
function App() {
    return (
        <StoreProvider store={redux.store}>
            <NavigationContainer ref={{ navigationRef }}>
                <RootNavigation />
            </NavigationContainer>
        </StoreProvider>
    );
}

export default App;
