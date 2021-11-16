import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import actions from '../../../redux/actions/signup.actions';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import { showMessage, hideMessage } from 'react-native-flash-message';
import globalStyles from './globalStyle';
const height: number = Dimensions.get('window').height;
const demoData = [
    { id: '0', name: 'Peu importe' },
    { id: '1', name: 'Algérien' },
    { id: '2', name: 'Marocain' },
    { id: '3', name: 'Tunisien' },
    { id: '4', name: 'Autre' },
    { id: '5', name: 'Je la garde pour moi' },
];
interface Props {}
interface origin {
    id: string;
    name: string;
}
const OriginScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const [origin, setOrigin] = React.useState<origin>({
        id: '',
        name: '',
    });
    const navigation = useNavigation();
    const handleSubmit = () => {
        if(origin.id !== '') {
            dispatch(actions.setOrigin(origin.id));
            navigation.navigate('From');
        }else {
            showMessage({
                message: 'Le champ est vide',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
        }
       
    };
    return (
        <LinearGradient
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <View style={{ height: height * 0.8 }}>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <Entypo name="map" size={height * 0.025} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quelle est votre origine ?</Text>
                </View>
                <FlatList
                    data={demoData}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={globalStyles.styleCheckbox}
                                onPress={() => setOrigin(item)}
                            >
                                <Text style={styles.textCheckBox}>{item.name}</Text>
                                <View style={styles.radio}>
                                    <RadioButton
                                        color="#FFFFFF"
                                        uncheckedColor="#FFFFFF"
                                        value={item.name}
                                        status={origin.id === item.id ? 'checked' : 'unchecked'}
                                        onPress={() => setOrigin(item)}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <ButtonNext onPress={handleSubmit} disable={false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    textCheckBox: {
        fontSize: height * 0.02,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default OriginScreen;
