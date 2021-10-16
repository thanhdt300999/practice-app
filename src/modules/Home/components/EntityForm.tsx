import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ButtonNext from './ButtonNext';
import { useForm, Controller } from "react-hook-form";
import ButtonBack from './ButtonBack';
interface Props {
    setRender: any,
    submitEntity
}

const EntityForm: React.FC<Props> = ({ submitEntity, setRender }) => {
    const [checked, setChecked] = React.useState('unchecked');
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = () => {
        submitEntity(checked)
        setRender("birthday")
    }
    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => console.log("abc")}
                />
                <View style={styles.header}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../../../../image/sexImage.png')}
                    />
                    <Text style={styles.textStyle}>Sex:</Text>
                </View>
                <View style={styles.styleCheckbox}>
                    <Text style={styles.textCheckBox}>Female:</Text>
                    <View style={styles.radio}>
                        <RadioButton
                            color='#FFFFFF'
                            uncheckedColor='#FFFFFF'
                            value="Female"
                            status={checked === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Female')}
                        />
                    </View>
                </View>
                <View style={styles.styleCheckbox}>
                    <Text style={styles.textCheckBox}>Male:</Text>
                    <RadioButton
                        color='#FFFFFF'
                        value="Male"
                        uncheckedColor='#FFFFFF'
                        status={checked === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Male')}
                    />
                </View>
            </View>
            <ButtonNext
                onPress={onSubmit}
                disable={checked === 'unchecked' ? true : false}
            />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20
    },
    imageStyle: {
        width: 75,
        height: 75,
        alignSelf: 'center'
        // marginBottom: "100%",
    },
    textStyle: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#FFFFFF'
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    textCheckBox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    radio: {
        alignSelf: 'flex-end'
    },

});

export default EntityForm;