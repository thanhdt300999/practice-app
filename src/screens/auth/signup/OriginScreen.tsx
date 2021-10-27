import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/signup.actions';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';

const demoData = [
    { id: '0', name: 'Peu importe' },
    { id: '1', name: 'Algérien' },
    { id: '2', name: 'Marocain' },
    { id: '3', name: 'Tunisien' },
    { id: '4', name: 'Autre' },
    { id: '5', name: 'Je la garde pour moi' },
];
interface Props {
}
interface origin {
    id: string;
    name: string;
}
const OriginScreen: React.FC<Props> = ({  }) => {
    const dispatch = useDispatch();
    const [origin, setOrigin] = React.useState<origin>({
        id: '',
        name: '',
    });
    const navigation = useNavigation();
    const handleSubmit = () => {
        dispatch(actions.setOrigin(origin.id))
        navigation.navigate('From');
    };
    return (
        <LinearGradient
            colors={['#FF59F4', '#FF5978']}
            style={{ flex: 1 }}
            useAngle={true}
            angle={45}
            angleCenter={{ x: 0, y: 1 }}
        >
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="folder" size={30} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quelle est votre origine ?</Text>
                </View>
                <FlatList
                    data={demoData}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.styleCheckbox}>
                                <Text style={styles.textCheckBox}>{item.name}:</Text>
                                <View style={styles.radio}>
                                    <RadioButton
                                        color="#FFFFFF"
                                        uncheckedColor="#FFFFFF"
                                        value={item.name}
                                        status={origin.id === item.id ? 'checked' : 'unchecked'}
                                        onPress={() => setOrigin(item)}
                                    />
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <ButtonNext onPress={handleSubmit} disable={origin.id !== '' ? false : true} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    iconStyle: {
        height: 75,
        width: 75,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: 40,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    textCheckBox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default OriginScreen;
