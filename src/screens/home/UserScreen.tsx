import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';

interface Props {}

const UserScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
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
