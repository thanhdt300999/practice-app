import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const ResolveAuthScreen = ({ navigation }) => {
    const readToken = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            if(token) {
                navigation.navigate("Home");
            }else {
                navigation.navigate("Signin");
            }
        } catch (error) {
            console.log('error to get token');
        }
    };
    useEffect(() => {
        readToken();
    }, []);
    return null;
};

export default ResolveAuthScreen;
