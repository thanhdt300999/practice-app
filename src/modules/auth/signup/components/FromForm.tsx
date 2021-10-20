import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../../../../../assets/AppText';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { useForm, Controller } from 'react-hook-form';
import Geolocation from 'react-native-geolocation-service';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
const FromForm = ({ setRender, submitFrom }) => {
    const [checked, setChecked] = React.useState('unchecked');
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });
    const onSubmit = () => {
        setRender('country');
        submitFrom(checked);
    };
    const handleOnPress = () => {};
    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => setRender('origin')} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="location-pin" size={40} color="#900" />
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
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Field is required!',
                            },
                            // pattern: {
                            //     value: regex,
                            //     message: 'invalid zipcode',
                            // },
                        }}
                        name="zipcode"
                        defaultValue=""
                    />
                    <TouchableOpacity
                        onPress={handleOnPress}
                        style={{ marginTop: 10, alignSelf: 'flex-end', marginHorizontal: 20 }}
                    >
                        <Text>Geo location</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ButtonNext onPress={handleSubmit(onSubmit)} disable={!isValid} />
        </>
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
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    textInput: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
});
export default FromForm;
