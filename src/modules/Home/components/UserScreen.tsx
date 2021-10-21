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
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';

interface Props {
    navigation;
}

const UserScreen: React.FC<Props> = ({ navigation }) => {
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

export default withNavigation(UserScreen);
