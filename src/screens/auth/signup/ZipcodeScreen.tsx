import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Octicons from 'react-native-vector-icons/Octicons';
import { useForm, Controller } from 'react-hook-form';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { TextInput } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';

interface Props {}
interface origin {
    id: string;
    name: string;
}
const ZipcodeScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.signup);
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        dispatch(actions.setZipcode(data.zipcode));
        navigation.navigate('City');
    };
    const regex = new RegExp(state.dataPostLogin.country.zipRegex);
    return (
        <LinearGradient
            colors={['#FF59F4', '#FF5978']}
            style={{ flex: 1 }}
            useAngle={true}
            angle={45}
            angleCenter={{ x: 0, y: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}
            >
                <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                    <View style={{ height: 550, alignSelf: 'stretch' }}>
                        <ButtonBack onPress={() => navigation.goBack()} />
                        <View style={styles.contain}>
                            <View style={styles.iconStyle}>
                                <Octicons name="file-zip" size={40} color="#fff" />
                            </View>
                            <Text style={styles.textStyle}>Quel est votre code postal ?</Text>
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Zip code"
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                pattern: {
                                    value: regex,
                                    message: 'invalid zipcode',
                                },
                            }}
                            name="zipcode"
                            defaultValue=""
                        />
                    </View>
                </TouchableWithoutFeedback>
                <ButtonNext onPress={handleSubmit(onSubmit)} disable={!isValid} />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contain: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
    },
    imageStyle: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        // marginBottom: "100%",
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
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
});

export default ZipcodeScreen;
