import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from "react-hook-form";
import ButtonNext from './ButtonNext';
import ButtonBack from './ButtonBack';
interface Props {
    submitBirthday: any,
    setRender: any,
}
const BirthdayForm: React.FC<Props> = ({ submitBirthday, setRender }) => {


    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        submitBirthday(data)
        setRender("origin")
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={{ height: 550, alignSelf: 'stretch'}}>
                    <ButtonBack 
                        onPress={() => setRender("entity")}
                    />
                    <View style={styles.header}>
                        <View style={styles.iconStyle}>
                            <Icon name='folder' size={40} color="#900" />
                        </View>
                        <Text style={styles.textStyle}>Birthday Form:</Text>
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
                                    message: 'Field is required!'
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
                                    message: 'Field is required!'
                                },
                            }}
                            name="year"
                            defaultValue=""
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <ButtonNext
                onPress={handleSubmit(onSubmit)}
                disable={false}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    imageStyle: {
        width: 75,
        height: 75
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 25
    },
    inputStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between'
    },
    textInput: {
        backgroundColor: 'transparent'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconStyle: {
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2
    },
});

export default BirthdayForm;