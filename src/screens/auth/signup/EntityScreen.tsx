import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../../redux/actions/signup-actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
interface Props {}
const height: number = Dimensions.get('window').height;
const EntityScreen: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => {
        state.signup.dataPostLogin;
    });
    const navigation = useNavigation();
    const [gender, setGender] = React.useState('unchecked');
    const onSubmit = () => {
        if(gender === 'unchecked') {
            showMessage({
                message: 'Le champ est vide',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
        } else {
            navigation.navigate('Birthday');
            dispatch(actions.setEntity(gender));
        }
       
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
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <Icon name="intersex" size={height * 0.025} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Vous etes: </Text>
                </View>
                <TouchableOpacity
                    style={globalStyles.styleCheckbox}
                    onPress={() => setGender('Female')}
                >
                    <Text style={styles.textCheckBox}>Homme</Text>
                    <View style={styles.radio}>
                        <RadioButton
                            color="#FFFFFF"
                            uncheckedColor="#FFFFFF"
                            value="Female"
                            status={gender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('Female')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={globalStyles.styleCheckbox}
                    onPress={() => setGender('Male')}
                >
                    <Text style={styles.textCheckBox}>Femme</Text>
                    <RadioButton
                        color="#FFFFFF"
                        value="Male"
                        uncheckedColor="#FFFFFF"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Male')}
                    />
                </TouchableOpacity>
            </View>
            <ButtonNext onPress={onSubmit} disable={false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    textCheckBox: {
        fontSize: height * 0.025,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default EntityScreen;
