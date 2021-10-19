import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../../../../assets/AppText';
import { Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
interface Props {
    onPress?: any;
    disable: boolean;
    style?: Object;
    signup?: boolean;
}
var width = Dimensions.get('window').width; //full width
const ButtonNext: React.FC<Props> = ({ onPress, disable, style, signup }) => {
    return (
        <View style={styles.container}>
            {signup ? (
                <TouchableOpacity style={styles.connectButton} onPress={onPress}>
                    <Icon name="check" size={30} color="#ffffff" />
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: '#ffffff',
                        }}
                    >
                        ME CONNECTER
                    </Text>
                </TouchableOpacity>
            ) : (
                <IconButton
                    icon="check"
                    color="#FFFFFF"
                    size={50}
                    disabled={disable}
                    style={[styles.confirmButton, style]}
                    onPress={onPress}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    confirmButton: {
        alignSelf: 'center',
        backgroundColor: '#FF905A',
    },
    container: {
        flex: 1,
        bottom: 0,
        marginTop: 0,
        position: 'absolute',
        alignSelf: 'center',
        marginBottom: 30,
        // marginBottom: 36
    },
    connectButton: {
        backgroundColor: '#ff2c2c',
        height: 50,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 10,
    },
});

export default ButtonNext;
