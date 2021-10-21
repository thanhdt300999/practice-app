import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    LogBox,
} from 'react-native';
import { Dimensions } from 'react-native';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { RootState } from '../../../config-redux/rootReducer';
import action from '../redux/action';
import actions from '../../auth/signin/redux/actions';

interface Props {}

const NotificationScreen: React.FC<Props> = ({}) => {
    return (
        <>
            <Text>NOtification Screen</Text>
        </>
    );
};

const styles = StyleSheet.create({});

export default withNavigation(NotificationScreen);
