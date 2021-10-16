import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
interface Props {
    onPress?: any,
    disable?: boolean,
    style?: Object
}
const ButtonBack: React.FC<Props> = ({ onPress, disable, style }) => {
    return (<View style={styles.header}>
        <IconButton
            icon="arrow-left"
            color='#ffffff'
            size={30}
            // disabled={render > 0 ? false : true}
            style={styles.backButton}
            onPress={onPress}
        />
    </View>);
}

const styles = StyleSheet.create({

    backButton: {
        alignSelf: 'flex-start'
    },
    header: {
        alignSelf: 'stretch',
        marginTop: 40,
    },
});

export default ButtonBack;