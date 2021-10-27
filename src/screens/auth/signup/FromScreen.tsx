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
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
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
const FromScreen: React.FC<Props> = ({}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });
    const navigation = useNavigation();
    const onSubmit = (data) => {
        navigation.navigate('Country');
    };
    const handleOnPress = () => {};
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
                        <View style={styles.header}>
                            <View style={styles.iconStyle}>
                                <Entypo name="location-pin" size={40} color="#fff" />
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
                                }}
                            >
                                <Text>Geo location</Text>
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
    scrollView: {
        height: 300,
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
