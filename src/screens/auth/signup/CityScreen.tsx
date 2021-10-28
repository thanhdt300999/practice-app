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
        navigation.navigate('Signup');
        dispatch(actions.setCity(city.id));
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
                        <FontAwesome5 name="warehouse" size={30} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quelle est votre ville ?</Text>
                </View>
                <View style={styles.scrollView}>
                    {state.isLoading === false && (
                        <FlatList
                            data={state.listCities}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.styleCheckbox}>
                                        <Text style={styles.textCheckBox}>{item.name}:</Text>
                                        <View style={styles.radio}>
                                            <RadioButton
                                                color="#FFFFFF"
                                                uncheckedColor="#FFFFFF"
                                                value={item.name}
                                                status={
                                                    city.id === item.id ? 'checked' : 'unchecked'
                                                }
                                                onPress={() => setCity(item)}
                                            />
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
            </View>
            <ButtonNext onPress={handleSubmit} disable={false /*city.id ? false : true*/} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
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
    textStyle: {
        color: '#FFFFFF',
        fontSize: 25,
        marginBottom: 10,
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
    scrollView: {
        height: 300,
    },
});

export default CityScreen;
