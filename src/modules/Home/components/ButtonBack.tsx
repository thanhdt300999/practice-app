import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../../../assets/AppText';
import { IconButton } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
interface Props {
    onPress?: any;
    disable?: boolean;
    style?: Object;
    signup?: boolean;
    navigation?: any;
    signin?: boolean;
}
const ButtonBack: React.FC<Props> = ({ onPress, disable, style, signup, navigation }) => {
    return (
        <View style={styles.header}>
            <IconButton
                icon="arrow-left"
                color="#ffffff"
                size={30}
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
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default withNavigation(ButtonBack);
