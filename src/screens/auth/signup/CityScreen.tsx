import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Feather from 'react-native-vector-icons/Feather';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
const height: number = Dimensions.get('window').height;
interface Props {}
interface city {
    id: string;
    name: string;
}
const CityScreen: React.FC<Props> = ({}) => {
    const state = useSelector((state: RootState) => state.signup);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [city, setCity] = React.useState<city>({
        id: '',
        name: '',
    });
    const handleSubmit = () => {
        if (city.id) {
            navigation.navigate('Signup');
            dispatch(actions.setCity(city.id));
        } else {
            showMessage({
                message: 'Le champ est vide',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
        }
    };
    React.useEffect(() => {
        if (state.dataPostLogin.zipcode) {
            let payload = {
                countryId: state.dataPostLogin.country.id,
                zipcode: state.dataPostLogin.zipcode,
            };
            dispatch(actions.getCitiesByZipcodeRequest(payload));
        }
        if (state.dataPostLogin.region) {
            let payload = {
                countryId: state.dataPostLogin.country.id,
                regionId: state.dataPostLogin.region,
            };
            dispatch(actions.getCitiesByRegionRequest(payload));
        }
        if (state.dataPostLogin.geolocation) {
            let payload = {
                latitude: state.dataPostLogin.geolocation.latitude,
                longitude: state.dataPostLogin.geolocation.longitude,
            };
            dispatch(actions.getCitiesByGeoRequest(payload));
        }
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
                        <Feather name="folder" size={height * 0.025} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quelle est votre ville ?</Text>
                </View>
                {state.isLoading === false && (
                    <FlatList
                        data={state.listCities}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={globalStyles.styleCheckbox}
                                    onPress={() => setCity(item)}
                                >
                                    <Text style={styles.textCheckBox}>{item.name}</Text>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            color="#FFFFFF"
                                            uncheckedColor="#FFFFFF"
                                            value={item.name}
                                            status={city.id === item.id ? 'checked' : 'unchecked'}
                                            onPress={() => setCity(item)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                colors={['red', 'tomato']}
                                refreshing={state.isLoading}
                                progressViewOffset={Platform.OS === 'ios' ? null : height * 0.1}
                            />
                        }
                    />
                )}
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

export default CityScreen;
