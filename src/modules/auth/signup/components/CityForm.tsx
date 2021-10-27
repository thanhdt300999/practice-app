import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import Text from '../../../../../assets/AppText';
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
import actions from '../redux/action';
import { RootState } from '../../../../redux/config-redux/rootReducer';
interface Props {
    submitCity;
    setRender;
    checkzipcode: boolean;
    countryId: string;
    params: string;
}

interface city {
    id: string;
    name: string;
}
const CityForm: React.FC<Props> = ({ submitCity, setRender, checkzipcode, countryId, params }) => {
    const state = useSelector((state: RootState) => state.signup);
    const dispatch = useDispatch();
    const [city, setCity] = React.useState<city>({
        id: '',
        name: '',
    });
    const handleSubmit = () => {
        setRender('signup');
        submitCity(city);
    };

    React.useEffect(() => {
        if (!checkzipcode) {
            let payload = {
                countryId,
                regionId: params,
            };
            dispatch(actions.getCitiesByRegionRequest(payload));
        } else {
            let payload = {
                countryId,
                zipcode: params,
            };
            dispatch(actions.getCitiesByZipcodeRequest(payload));
        }
    }, []);

    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => (checkzipcode ? setRender('zipcode') : setRender('region'))}
                />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="folder" size={40} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quelle est votre ville ?</Text>
                </View>
                <View style={styles.scrollView}>
                    {state.isLoading === false && (
                        <FlatList
                            data={state.listCities}
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
                                                    city.id === item.id ? 'checked' : 'unchecked'
                                                }
                                                onPress={() => setCity(item)}
                                            />
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
            </View>
            <ButtonNext onPress={handleSubmit} disable={city.id ? false : true} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconStyle: {
        height: 75,
        width: 75,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: 40
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10
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

export default CityForm;
