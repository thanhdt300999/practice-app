import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signin from './signin/component/Signin';
import Discovery from '../Home/components/Discovery';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config-redux/rootReducer';
const combineLogin = ({ navigation }) => {
    const state = useSelector((state: RootState) => state.signin);
    if (state.isLogged) {
        return <Discovery></Discovery>;
    } else {
        return <Signin></Signin>;
    }
};

export default combineLogin;
