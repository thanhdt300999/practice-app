import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

function CheckBox({ label, status, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Checkbox status={status} />
                <Text style={styles.textStyle}>{label}</Text>
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
        marginTop: 30
    },
    textStyle: {
        flexWrap: 'wrap',
        flex: 1
    },
});
export default CheckBox;
