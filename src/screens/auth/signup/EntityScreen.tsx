import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
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
const height = Dimensions.get('window').height;
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
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <View>
                <ButtonBack onPress={() => navigation.navigate('Signin')} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="intersex" size={height * 0.04} color="#fff" />
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
        height: height * 0.1,
        width: height * 0.1,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: height * 0.03,
    },
    textStyle: {
        fontSize: height * 0.04,
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
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default EntityScreen;
