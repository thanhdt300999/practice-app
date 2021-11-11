import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Text from '../../../assets/AppText';
import Feather from 'react-native-vector-icons/Feather';
const height = Dimensions.get('window').height;
function CheckBox({ label, status, onPress }) {
    const color = status === 'checked' ? '#fff' : '#ccc';
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={[styles.customCheckbox]}>
                    {status === 'checked' && <Feather name="check" color="#fff" size={25} />}
                </View>
                <Text style={[styles.textStyle]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ffffff',
        marginHorizontal: 15,
        marginTop: 30,
    },
    textStyle: {
        flexWrap: 'wrap',
        color: 'white',
        flex: 1,
        fontSize: height * 0.016,
    },
    customCheckbox: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        width: 35,
        height: 35,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // iconCheckbox: {
    //     alignSelf: 'stretch',
    //     // width: 30,
    //     // height: 30
    // }
});
export default CheckBox;
