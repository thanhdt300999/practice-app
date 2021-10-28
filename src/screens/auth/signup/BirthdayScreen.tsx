import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/signup.actions';
import ButtonBack from '../../../components/button/ButtonBack';
import ButtonNext from '../../../components/button/ButtonNext';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const BirthdayScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });
    const navigation = useNavigation();
    const onSubmit = (data) => {
        dispatch(actions.setBirthday(converBirthday(data)));
        navigation.navigate('Origin');
    };
    const convertDateandMonth = (value) => {
        return value < 10 ? '0' + value.toString() : value.toString();
    };
    const dateRegex = new RegExp('^([1-9]|[12][0-9]|3[01])$');
    const monthRegex = new RegExp('^(0?[1-9]|1[012])$');
    const yearRegex = new RegExp('^\\d{4}$');
    const converBirthday = (birthday) => {
        return `${birthday.year}-${convertDateandMonth(birthday.month)}-${convertDateandMonth(
            birthday.date
        )}`;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <LinearGradient
                colors={['#FF59F4', '#FF5978']}
                style={{ flex: 1 }}
                useAngle={true}
                angle={45}
                angleCenter={{ x: 0, y: 1 }}
            >
                <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                    <View style={{ height: 550, alignSelf: 'stretch' }}>
                        <ButtonBack onPress={() => navigation.goBack()} />
                        <View style={styles.header}>
                            <View style={styles.iconStyle}>
                                <Icon name="birthday-cake" size={30} color="#fff" />
                            </View>
                            <Text style={styles.textStyle}>
                                Quelle est votre date de naissance ?
                            </Text>
                        </View>
                        <View style={styles.inputStyle}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="DD"
                                        keyboardType="number-pad"
                                        autoCompleteType={false}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Field is required!',
                                    },
                                    pattern: {
                                        value: dateRegex,
                                        message: 'Date is invalid',
                                    },
                                }}
                                name="date"
                                defaultValue=""
                            />
                            <Text style={{ fontSize: 40, color: '#ccc' }}>/</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="MM"
                                        keyboardType="number-pad"
                                        autoCompleteType={false}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Field is required!',
                                    },
                                    pattern: {
                                        value: monthRegex,
                                        message: 'Month is invalid',
                                    },
                                }}
                                name="month"
                                defaultValue=""
                            />
                            <Text style={{ fontSize: 40, color: '#ccc' }}>/</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="YY"
                                        keyboardType="number-pad"
                                        autoCompleteType={false}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Field is required!',
                                    },
                                    pattern: {
                                        value: yearRegex,
                                        message: 'Year is invalid',
                                    },
                                }}
                                name="year"
                                defaultValue=""
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ButtonNext onPress={handleSubmit(onSubmit)} disable={!isValid} />
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageStyle: {
        width: 75,
        height: 75,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    inputStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'transparent',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    container: {
        flex: 1,
        alignItems: 'center',
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
});

export default BirthdayScreen;
