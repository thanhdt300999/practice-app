import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    // Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
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
const height = Dimensions.get('window').height;
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
    const onSubmit = (data) => {
        navigation.navigate('Country');
    };
    const handleOnPress = () => {
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
                maximumAge: 10000000,
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}
            >
                <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                    <View style={{ height: 550, alignSelf: 'stretch' }}>
                        <ButtonBack onPress={() => navigation.goBack()} />
                        <View style={styles.header}>
                            <View style={styles.iconStyle}>
                                <Entypo name="location-pin" size={height * 0.04} color="#fff" />
                            </View>
                            <Text style={styles.textStyle}>Ou habitez-vous ?</Text>
                        </View>
                        <View style={styles.scrollView}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="From"
                                        autoCompleteType={false}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Field is required!',
                                    },
                                }}
                                name="from"
                                defaultValue=""
                            />
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
                                <Text style={{ color: '#fff' }}>Geo location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ButtonNext onPress={handleSubmit(onSubmit)} disable={!isValid} />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageStyle: {
        width: 75,
        height: 75,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: height * 0.04,
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
    radio: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        height: 300,
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
});

export default FromScreen;
