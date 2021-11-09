import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    PermissionsAndroid,
    // Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Text from '../../../../assets/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import { useForm, Controller } from 'react-hook-form';
import Geolocation from '@react-native-community/geolocation';
import actions from '../../../redux/actions/signup.actions';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle'
const height = Dimensions.get('window').height;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
interface Props {}
interface origin {
    id: string;
    name: string;
}
const FromScreen: React.FC<Props> = ({}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onSubmit = () => {
        navigation.navigate('Country');
    };
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (info) => {
                        let data = {
                            latitude: info.coords.latitude,
                            longitude: info.coords.longitude,
                        };
                        dispatch(actions.setGeoLocation(data));
                        navigation.navigate('City');
                    },
                    (error) => console.log(error),
                    {
                        enableHighAccuracy: true,
                        timeout: 1000,
                        // maximumAge: 10000000,
                    }
                );
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    let info1 = {
        coords: {
            accuracy: 5,
            altitude: 5,
            heading: 0,
            latitude: 37.421998333333335,
            longitude: -122.084,
            speed: 0,
        },
        mocked: false,
        timestamp: 1636099015077,
    };

    const handleOnPress = () => {
        let data = {
            latitude: info1.coords.latitude,
            longitude: info1.coords.longitude,
        };
        Geolocation.getCurrentPosition(
            (info) => {
                console.log(info);
                // let data = {
                //     latitude: info.coords.latitude,
                //     longitude: info.coords.longitude,
                // };
                // console.log(data)
                // dispatch(actions.setGeoLocation(data));
                // navigation.navigate('City');
            },
            (error) => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 1000,
                // maximumAge: 10000000,
            }
        );
        dispatch(actions.setGeoLocation(data));
        navigation.navigate('City');
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
            <View>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <Entypo name="location-pin" size={height * 0.03} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Ou habitez-vous ?</Text>
                </View>
                <TouchableOpacity style={styles.styleCheckbox} onPress={() => onSubmit()}>
                    <Text style={styles.textCheckBox}>Ma localisation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleOnPress}
                    style={{
                        marginTop: 10,
                        alignSelf: 'flex-end',
                        marginHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Entypo name="location-pin" size={15} color="#fff" />
                    <Text style={{ color: '#fff' }}>Me Geolocaliser ?</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    radio: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        height: 300,
    },
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    inputStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textCheckBox: {
        fontSize: height * 0.02,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
});

export default FromScreen;
