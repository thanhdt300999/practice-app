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
    SafeAreaView,
} from 'react-native';
import { Dimensions } from 'react-native';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

interface Props {
}

const UserScreen: React.FC<Props> = ({ }) => {
    const navigation = useNavigation()
    const onPress = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('puk');
            navigation.navigate('Signin');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Text>User Screen</Text>
                <Button style={{ alignSelf: 'center' }} onPress={onPress}>
                    Log out
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default UserScreen;
