import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Text from '../../../../assets/AppText';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import ButtonNext from './ButtonNext';
import ButtonBack from './ButtonBack';
interface Props {
    submitBirthday: any;
    setRender: any;
}
const BirthdayForm: React.FC<Props> = ({ submitBirthday, setRender }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        console.log(errors);
        submitBirthday(data);
        setRender('origin');
    };
    const dateRegex = new RegExp('^([1-9]|[12][0-9]|3[01])$');
    const monthRegex = new RegExp('^([1-9]|1[0-2])$');
    const yearRegex = new RegExp('^\\d{4}$');
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={{ height: 550, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={() => setRender('entity')} />
                    <View style={styles.header}>
                        <View style={styles.iconStyle}>
                            <Icon name="birthday-cake" size={40} color="#900" />
                        </View>
                        <Text style={styles.textStyle}>Quelle est votre date de naissance ?</Text>
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
                        {errors.firstName && <Text>Date is required.</Text>}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="MM"
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
                        {errors.firstName && <Text>Date is required.</Text>}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="YY"
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Field is required!',
                                },
                                // pattern: {
                                //     value: yearRegex,
                                //     message: "Year is invalid"
                                // }
                            }}
                            name="year"
                            defaultValue=""
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <ButtonNext onPress={handleSubmit(onSubmit)} disable={!isValid} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    imageStyle: {
        width: 75,
        height: 75,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 25,
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
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
});

export default BirthdayForm;
