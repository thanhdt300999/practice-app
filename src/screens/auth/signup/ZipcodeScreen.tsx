import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Octicons from 'react-native-vector-icons/Octicons';
import { useForm, Controller } from 'react-hook-form';
import actions from '../../../redux/actions/signup-actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { TextInput } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle';
import ErrorBox from '../../../components/error/errorBox';
const height: number = Dimensions.get('window').height;
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
    } = useForm({ mode: 'onSubmit' });

    const onSubmit = (data) => {
        dispatch(actions.setZipcode(data.zipcode));
        navigation.navigate('City');
    };
    const regex = new RegExp(state.dataPostLogin.country.zipRegex);
    return (
        <LinearGradient
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={() => navigation.goBack()} />
                    <View style={globalStyles.header}>
                        <View style={globalStyles.iconStyle}>
                            <Octicons name="file-zip" size={height * 0.03} color="#fff" />
                        </View>
                        <Text style={globalStyles.textFormStyle}>Quel est votre code postal ?</Text>
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Code postal ?"
                                keyboardType="number-pad"
                                underlineColor="#ffffff"
                                theme={{
                                    colors: {
                                        text: 'white',
                                        placeholder: '#d6d3cb',
                                        primary: 'white',
                                    },
                                    fonts: {
                                        regular: {
                                            fontFamily: 'Avenir Next Condensed',
                                        },
                                    },
                                }}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Field is required!',
                            },
                            pattern: {
                                value: regex,
                                message: 'Invalid zipcode',
                            },
                        }}
                        name="zipcode"
                        defaultValue=""
                    />
                    {errors.zipcode && <ErrorBox error={errors.zipcode.message} />}
                </View>
            </TouchableWithoutFeedback>
            <ButtonNext onPress={handleSubmit(onSubmit)} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 35,
    },
});

export default ZipcodeScreen;
