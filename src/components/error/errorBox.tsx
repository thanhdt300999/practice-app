import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import Text from '../../../assets/AppText';
const height: number = Dimensions.get('window').height;
const ErrorBox = ({error}) => {
    return (
        <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    errorBox: {
        marginHorizontal: 30,
        height: height * 0.045,
        backgroundColor: 'red',
        marginTop: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        marginLeft: 20,
    },
})

export default ErrorBox;