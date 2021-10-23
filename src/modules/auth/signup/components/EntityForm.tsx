import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../../../../assets/AppText';
import { RadioButton } from 'react-native-paper';
import ButtonNext from './ButtonNext';
import { useForm, Controller } from 'react-hook-form';
import ButtonBack from './ButtonBack';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Props {
    setRender: any;
    submitEntity;
    navigation;
}

const EntityForm: React.FC<Props> = ({ submitEntity, setRender, navigation }) => {
    const [checked, setChecked] = React.useState('unchecked');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {
        submitEntity(checked);
        setRender('birthday');
    };
    return (
        <>
            <SafeAreaView>
                <View style={{ height: 550, alignSelf: 'stretch' }}>
                    <ButtonBack onPress={() => navigation.navigate('Signin')} />
                    <View style={styles.header}>
                        <View style={styles.iconStyle}>
                            <Icon name="intersex" size={40} color="#900" />
                        </View>
                        <Text style={styles.textStyle}>Vous etes</Text>
                    </View>
                    <View style={styles.styleCheckbox}>
                        <Text style={styles.textCheckBox}>Homme:</Text>
                        <View style={styles.radio}>
                            <RadioButton
                                color="#FFFFFF"
                                uncheckedColor="#FFFFFF"
                                value="Female"
                                status={checked === 'Female' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Female')}
                            />
                        </View>
                    </View>
                    <View style={styles.styleCheckbox}>
                        <Text style={styles.textCheckBox}>Male:</Text>
                        <RadioButton
                            color="#FFFFFF"
                            value="Male"
                            uncheckedColor="#FFFFFF"
                            status={checked === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Male')}
                        />
                    </View>
                </View>
                <ButtonNext onPress={onSubmit} disable={checked === 'unchecked' ? true : false} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
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
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 20,
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
});

export default withNavigation(EntityForm);
