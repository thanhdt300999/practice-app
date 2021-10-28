import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import actions from '../../redux/actions/signin.actions'
import { useDispatch } from 'react-redux';
interface Props {}

const UserScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPress = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('puk');
      dispatch(actions.removeToken())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <Text>User Screen</Text>
        <Button style={{alignSelf: 'center'}} onPress={onPress}>
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
