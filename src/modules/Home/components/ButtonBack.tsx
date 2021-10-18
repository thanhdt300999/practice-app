import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
interface Props {
    onPress?: any;
    disable?: boolean;
    style?: Object;
    signup?: boolean;
}
const ButtonBack: React.FC<Props> = ({ onPress, disable, style, signup }) => {
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
                    <TouchableOpacity onPress={() => console.log('press')}>
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

export default ButtonBack;
