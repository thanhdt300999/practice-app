import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Text from '../../../assets/AppText';
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
interface Props {
    onPress?: any;
    disable?: boolean;
    style?: Object;
    signup?: boolean;
    signin?: boolean;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const marginTop = Platform.OS === 'ios' ? height * 0.04 : height * 0.02;
const ButtonBack: React.FC<Props> = ({ onPress, disable, style, signup }) => {
    const navigation = useNavigation();
    
    return (
        <View style={[styles.header]}>
            <IconButton
                icon="arrow-left"
                color="#ffffff"
                size={height * 0.04}
                // disabled={render > 0 ? false : true}
                style={[styles.backButton, style]}
                onPress={onPress}
            />
            {signup && <Text style={styles.textDescription}>Incription</Text>}
            {signup && <TouchableOpacity
                style={styles.buttonSignup}
                onPress= {() => navigation.navigate("Signin")}
            >
                <Text style={styles.textComplete}>Deja un complte ?</Text>
            </TouchableOpacity>}
            {/* {signup && 
            <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
                style={styles.buttonSignup}
            >
                <Text style={styles.textComplete}>Deja un complte ?</Text>
            </TouchableOpacity>
            </View>
            } */}
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
        // borderColor: '#000',
        // borderWidth: 1,
        zIndex: 2,
        flexDirection: 'row',
        marginHorizontal: 15,
        width: width - 30,
        justifyContent: 'space-between'
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
        fontSize: height*0.02
        
    },
    textDescription: {
        color: '#ffffff',
        fontSize: height*0.03,
        alignSelf: 'center',
        marginLeft: 40
    },
    buttonSignup: {
        alignSelf: 'center'
    }
});

export default ButtonBack;
