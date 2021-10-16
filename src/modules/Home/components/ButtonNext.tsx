import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
interface Props {
    onPress?: any,
    disable: boolean,
    style?: Object
}
const ButtonNext: React.FC<Props> = ({ onPress, disable, style }) => {
    return (<View style={styles.container}>
        <IconButton
            icon="check"
            color='#FFFFFF'
            size={50}
            disabled={disable}
            style={[styles.confirmButton, style]}
            onPress={onPress}
        />
    </View>);
}

const styles = StyleSheet.create({
    confirmButton: {
        alignSelf: 'center',
        backgroundColor: '#FF905A',
    },
    container: {
        flex: 1,
        bottom: 0,
        marginTop: 0
        // marginBottom: 36
    }
});

export default ButtonNext;