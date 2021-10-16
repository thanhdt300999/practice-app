import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';

const demoData = [
    { id: '0', name: 'Peu importe' },
    { id: '1', name: 'Algérien' },
    { id: '2', name: 'Marocain' },
    { id: '3', name: 'Tunisien' },
    { id: '4', name: 'Autre' },
    { id: '5', name: 'Je la garde pour moi' },
]

const OriginForm = ({ setRender, submitOrigin }) => {
    const [checked, setChecked] = React.useState('unchecked');

    const handleSubmit = () => {
        submitOrigin(checked)
        setRender('from')
    }
    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => setRender('birthday')}
                />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name='folder' size={40} color="#900" />
                    </View>
                    <Text style={styles.textStyle}>Origin Form:</Text>
                </View>
                <FlatList
                    data={demoData}
                    renderItem={({ item }) => {
                        return <View style={styles.styleCheckbox}>
                            <Text style={styles.textCheckBox}>{item.name}:</Text>
                            <View style={styles.radio}>
                                <RadioButton
                                    color='#FFFFFF'
                                    uncheckedColor='#FFFFFF'
                                    value={item.name}
                                    status={checked === item.name ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked(item.name)}
                                />
                            </View>
                        </View>
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
            <ButtonNext
                onPress={handleSubmit}
                disable={false}
            />
        </>
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
        marginHorizontal: 10
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

export default OriginForm;