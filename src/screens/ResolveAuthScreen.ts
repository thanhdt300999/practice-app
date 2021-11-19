import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions/signin-actions'
import { Text } from 'react-native';
const ResolveAuthScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const readToken = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch(actions.setToken(token))
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        readToken();
    }, []);
    return null
};

export default ResolveAuthScreen;
