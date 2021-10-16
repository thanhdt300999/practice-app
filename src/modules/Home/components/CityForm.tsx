import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
interface Props {
    submitCity,
    setRender,
    checkzipcode: boolean
}


const CityForm: React.FC<Props> = ({ submitCity, setRender, checkzipcode }) => {
    console.log(checkzipcode)
    const [checked, setChecked] = React.useState('unchecked');
    const handleSubmit = () => {
        setRender('signup');
        submitCity(checked)
    }
    return (
        <View>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => checkzipcode ? setRender('zipcode') : setRender('region')}
                />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name='folder' size={40} color="#900" />
                    </View>
                    <Text style={styles.textStyle}>City Form:</Text>
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
    container: {
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        marginBottom: 20
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
    textStyle: {
        color: '#FFFFFF',
        fontSize: 25,
        marginBottom: 10
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
    }
});

export default CityForm;