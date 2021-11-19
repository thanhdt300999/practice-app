import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Text from '../../../assets/AppText';
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props {
    onPress?: any;
    disable?: boolean;
    style?: Object;
    signup?: boolean;
    signin?: boolean;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
const ButtonBack: React.FC<Props> = ({ onPress, disable, style, signup }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.header]}>
            <TouchableOpacity style={[styles.backButton, style]} onPress={onPress}>
                <AntDesign name="left" color="#ffffff" size={height * 0.025} />
            </TouchableOpacity>
            {signup && <Text style={styles.textDescription}>Incription</Text>}
            {signup && (
                <TouchableOpacity
                    style={styles.buttonSignup}
                    onPress={() => navigation.navigate('Signin')}
                >
                    <Text style={styles.textComplete}>Deja un complte ?</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-start',
       
    },
    header: {
        marginTop: marginTop,
        alignSelf: 'stretch',
        position: 'absolute',
        zIndex: 2,
        flexDirection: 'row',
        marginHorizontal: 30,
        width: width - 30,
        justifyContent: 'space-between',
    },
    textSignUp: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginLeft: width * 0.35,
        alignItems: 'center',
    },
    textComplete: {
        textDecorationLine: 'underline',
        color: '#ffffff',
        marginHorizontal: 10,
        fontSize: height * 0.025,
    },
    textDescription: {
        color: '#ffffff',
        fontSize: height * 0.035,
        alignSelf: 'center',
        marginLeft: 60,
        fontFamily: Platform.OS === 'android' ? 'AvenirNextCondensed_Bold' : 'Avenir Next Condensed',
        fontWeight: 'normal'
    },
    buttonSignup: {
        alignSelf: 'center',
    },
});

export default ButtonBack;
