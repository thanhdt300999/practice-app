import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle'
const height: number = Dimensions.get('window').height;
interface Props {}
interface country {
    id: string;
    name: string;
    zipFormat: string;
    zipRegex: string;
}
const CountryScreen: React.FC<Props> = ({}) => {
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
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <Entypo name="map" size={height * 0.025} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quel est votre pays ?</Text>
                    <Text style={{alignSelf: 'center', marginTop: 5 , color: '#fff',fontSize: height*0.019}}>Un seul choix possible</Text>
                </View>
                <FlatList
                    data={state.listCountries}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={globalStyles.styleCheckbox} onPress={() => setCountry(item)}>
                                <Text style={styles.textCheckBox}>{item.name}</Text>
                                <View style={styles.radio}>
                                    <RadioButton
                                        color="#FFFFFF"
                                        uncheckedColor="#FFFFFF"
                                        value={item.name}
                                        status={country.id === item.id ? 'checked' : 'unchecked'}
                                        onPress={() => setCountry(item)}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            colors={['red', 'tomato']}
                            refreshing={state.isLoading}
                            progressViewOffset={Platform.OS === "ios" ? null : height*0.1}
                        />
                    }
                />
            </View>
            <ButtonNext onPress={onSubmit} disable={country.id !== '' ? false : true} />
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

export default CountryScreen;
