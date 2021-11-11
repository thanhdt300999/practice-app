import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux'
import redux from './src/redux/config-redux/configureStore';
import { navigationRef } from './src/navigation/NavigationService';
import RootNavigation from './src/navigation/rootNavigation'
import FlashMessage from "react-native-flash-message";
function App() {
    return (
        <StoreProvider store={redux.store}>
            <NavigationContainer ref={navigationRef}>
                <RootNavigation />
                <FlashMessage position="top" />
            </NavigationContainer>
        </StoreProvider>
    );
}

export default App;
