import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import Text from '../../../../assets/AppText';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import ButtonNext from './ButtonNext';
import actions from '../redux/action';
import ButtonBack from './ButtonBack';
interface Props {
    submitCountry?: any;
    setRender?: any;
}
interface checked {
    id: string;
    name: string;
    zipFormat: string;
    zipRegex: string;
}

const CountryForm: React.FC<Props> = ({ submitCountry, setRender }) => {
    const listCountries = useSelector((state: any) => state.signup.listCountries);
    const dispatch = useDispatch();
    const [country, setCountry] = React.useState<checked>({
        id: '',
        name: '',
        zipFormat: '',
        zipRegex: '',
    });
    const handleCheckZipCode = () => {
        if (country.zipFormat && country.zipRegex) {
            return true;
        } else {
            return false;
        }
    };
    const onSubmit = () => {
        submitCountry(country);
        handleCheckZipCode() ? setRender('zipcode') : setRender('region');
    };
    React.useEffect(() => {
        dispatch(actions.getCountries());
    }, []);
    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => setRender('from')} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="location-arrow" size={40} color="#900" />
                    </View>
                    <Text style={styles.textStyle}>Quel est votre pays ?</Text>
                </View>
                <View style={styles.scrollView}>
                    <FlatList
                        data={listCountries}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.styleCheckbox}>
                                    <Text style={styles.textCheckBox}>{item.name}:</Text>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            color="#FFFFFF"
                                            uncheckedColor="#FFFFFF"
                                            value={item.name}
                                            status={
                                                country.id === item.id ? 'checked' : 'unchecked'
                                            }
                                            onPress={() => setCountry(item)}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
            <ButtonNext onPress={onSubmit} disable={country.id ? false : true} />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    iconStyle: {
        height: 90,
        width: 90,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 25,
        marginBottom: 10,
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    textCheckBox: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        height: 300,
    },
});

export default CountryForm;
