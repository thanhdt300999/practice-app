import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Text from '../../../../../assets/AppText';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
interface Props {
    setRender;
    submitZipCode;
    zipCodeFormat: string;
    zipCodeRegex: string;
}

const ZipCodeForm: React.FC<Props> = ({
    submitZipCode,
    setRender,
    zipCodeFormat,
    zipCodeRegex,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        submitZipCode(data.zipcode);
        setRender('city');
    };
    const handleBack = () => {
        setRender('country');
        submitZipCode('');
    };
    const regex = new RegExp(zipCodeRegex);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={{ height: 550, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={handleBack} />
                    <View style={styles.contain}>
                        <View style={styles.iconStyle}>
                            <Icon name="folder" size={40} color="#fff" />
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
        paddingVertical: 10
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
        marginBottom: 40
    },
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
});

export default ZipCodeForm;
