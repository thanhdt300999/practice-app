import React from 'react';
import type { Node } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux'
import redux from './src/redux/config-redux/configureStore';
import { navigationRef } from './src/navigation/NavigationService';
import RootNavigation from './src/navigation/rootNavigation'
function App() {
    return (
        <StoreProvider store={redux.store}>
            <NavigationContainer ref={navigationRef}>
                <RootNavigation />
            </NavigationContainer>
        </StoreProvider>
    );
}

export default App;
