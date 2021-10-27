import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';

interface Props {}

const EntityScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => {
        state.signup.dataPostLogin;
    });
    const navigation = useNavigation();
    const [gender, setGender] = React.useState('unchecked');
    const onSubmit = () => {
        navigation.navigate('Birthday');
        dispatch(actions.setEntity(gender));
    };

    return (
        <LinearGradient
            colors={['#FF59F4', '#FF5978']}
            style={{ flex: 1 }}
            useAngle={true}
            angle={45}
            angleCenter={{ x: 0, y: 1 }}
        >
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => navigation.navigate('Signin')} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="intersex" size={30} color="#fff" />
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
                            status={gender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('Female')}
                        />
                    </View>
                </View>
                <View style={styles.styleCheckbox}>
                    <Text style={styles.textCheckBox}>Male:</Text>
                    <RadioButton
                        color="#FFFFFF"
                        value="Male"
                        uncheckedColor="#FFFFFF"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Male')}
                    />
                </View>
            </View>
            <ButtonNext onPress={onSubmit} disable={gender === 'unchecked' ? true : false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
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
});

export default EntityScreen;
