import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
const FromForm = ({ setRender, submitFrom }) => {
    const [checked, setChecked] = React.useState('unchecked');

    const handleSubmit = () => {
        setRender('country');
        submitFrom(checked)
    }

    return (
        <View>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => setRender('origin')}
                />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name='folder' size={40} color="#900" />
                    </View>
                    <Text style={styles.textStyle}>From Form:</Text>
                </View>
                <View style={styles.scrollView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.styleCheckbox}>
                            <Text style={styles.textCheckBox}>Bac Ninh:</Text>
                            <View style={styles.radio}>
                                <RadioButton
                                    color='#FFFFFF'
                                    uncheckedColor='#FFFFFF'
                                    value="BN"
                                    status={checked === 'BN' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('BN')}
                                />
                            </View>
                        </View>
                        <View style={styles.styleCheckbox}>
                            <Text style={styles.textCheckBox}>Ha Noi:</Text>
                            <RadioButton
                                color='#FFFFFF'
                                value="HN"
                                uncheckedColor='#FFFFFF'
                                status={checked === 'HN' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('HN')}
                            />
                        </View>
                        <View style={styles.styleCheckbox}>
                            <Text style={styles.textCheckBox}>TP Ho Chi Minh:</Text>
                            <View style={styles.radio}>
                                <RadioButton
                                    color='#FFFFFF'
                                    uncheckedColor='#FFFFFF'
                                    value="HCM"
                                    status={checked === 'HCM' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('HCM')}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <ButtonNext
                    onPress={handleSubmit}
                    disable={false}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20
    },
    imageStyle: {
        width: 75,
        height: 75,
        alignSelf: 'center'
        // marginBottom: "100%",
    },
    textStyle: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#FFFFFF'
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    textCheckBox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    radio: {
        alignSelf: 'flex-end'
    },
    scrollView: {
        height: 300
    },
    iconStyle: {
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2
    },
});
export default FromForm;