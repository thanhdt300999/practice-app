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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Geolocation from '@react-native-community/geolocation';
import actions from '../../../redux/actions/signup-actions';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
const height: number = Dimensions.get('window').height;
interface Props {}
interface origin {
    id: string;
    name: string;
}
const FromScreen: React.FC<Props> = ({}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onSubmit = () => {
        navigation.navigate('Country');
    };
    const handleOnPress = () => {
        Geolocation.getCurrentPosition(
            (info) => {
                let data = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                };
                setTimeout(() => {
                    dispatch(actions.setGeoLocation(data));
                    navigation.navigate('City');
                }, 1000);
            },
            (error) => {
                showMessage({
                    message: 'Geolocalisation indisponible',
                    color: 'white',
                    backgroundColor: '#ff2c2c',
                    textStyle: { fontFamily: 'Avenir Next Condensed' },
                    style: { alignItems: 'center' },
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 999,
            }
        );
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
                        <EvilIcons name="location" size={height * 0.025} color="#fff" />
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
                    <EvilIcons name="location" size={15} color="#fff" />
                    <Text style={{ color: '#fff' }}>Me Geolocaliser ?</Text>
                </TouchableOpacity>
            </View>
            <ButtonNext
                onPress={onSubmit}
                disable={false}
            />
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
