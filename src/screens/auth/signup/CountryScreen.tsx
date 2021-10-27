import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';

interface Props {

}

interface country {
    id: string;
    name: string;
    zipFormat: string;
    zipRegex: string;
}
const CountryScreen: React.FC<Props> = ({ }) => {
    const state = useSelector((state: RootState) => state.signup);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [country, setCountry] = React.useState<country>({
        id: '',
        name: '',
        zipFormat: '',
        zipRegex: '',
    });
    const handleCheckZipCode = () => {
        if (country.zipFormat && country.zipRegex) {
            return true;
        } else {
            return false;
        }
    };
    const onSubmit = () => {
        dispatch(actions.setCountry(country));
        handleCheckZipCode() ? navigation.navigate('Zipcode') : navigation.navigate('Region');
    };
    React.useEffect(() => {
        dispatch(actions.getCountries());
    }, []);
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
                        <FontAwesome5 name="landmark" size={30} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quel est votre pays ?</Text>
                </View>
                <FlatList
                    data={state.listCountries}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.styleCheckbox}>
                                <Text style={styles.textCheckBox}>{item.name}:</Text>
                                <View style={styles.radio}>
                                    <RadioButton
                                        color="#FFFFFF"
                                        uncheckedColor="#FFFFFF"
                                        value={item.name}
                                        status={country.id === item.id ? 'checked' : 'unchecked'}
                                        onPress={() => setCountry(item)}
                                    />
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <ButtonNext onPress={onSubmit} disable={country.id !== '' ? false : true} />
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

export default CountryScreen;
