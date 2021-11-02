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


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const ButtonBack: React.FC<Props> = ({ onPress, disable, style, signup }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {/* <IconButton
                icon="camera"
                color='#ffffff'
                size={20}
                onPress={() => console.log('Pressed')}
            /> */}
            <IconButton
                icon="arrow-left"
                color="#ffffff"
                size={height * 0.05}
                // disabled={render > 0 ? false : true}
                style={[styles.backButton, style]}
                onPress={onPress}
            />
            {signup && (
                <View style={styles.textSignUp}>
                    <Text style={styles.textDescription}>Incription</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.textComplete}>Déjà un compte ?</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-start',
    },
    header: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === "ios" ? height*0.04 : 0
    },
    textSignUp: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textComplete: {
        textDecorationLine: 'underline',
        color: '#ffffff',
        marginHorizontal: 10,
    },
    textDescription: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ButtonBack;
