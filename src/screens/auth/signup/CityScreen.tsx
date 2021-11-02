import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
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
const height = Dimensions.get('window').height;

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
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <FontAwesome5 name="warehouse" size={height * 0.04} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quelle est votre ville ?</Text>
                </View>
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
                                            status={city.id === item.id ? 'checked' : 'unchecked'}
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
            <ButtonNext onPress={handleSubmit} disable={city.id ? false : true} />
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
        height: height * 0.1,
        width: height * 0.1,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: height * 0.04,
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
        fontSize: height * 0.03,
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
