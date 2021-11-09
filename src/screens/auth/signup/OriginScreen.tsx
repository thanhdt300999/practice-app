import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/signup.actions';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle'
const height = Dimensions.get('window').height;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
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
        dispatch(actions.setOrigin(origin.id));
        navigation.navigate('From');
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
                        <Icon name="folder" size={height * 0.03} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quelle est votre origine ?</Text>
                </View>
                <FlatList
                    data={demoData}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.styleCheckbox} onPress={() => setOrigin(item)}>
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
                            </TouchableOpacity>
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
    textStyle: {
        fontSize: height * 0.03,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
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
