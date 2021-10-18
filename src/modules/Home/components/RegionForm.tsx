import React from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/action';
import ButtonBack from './ButtonBack';
import ButtonNext from './ButtonNext';
interface Props {
    setRender: any;
    submitRegion: any;
    countryId: string;
}
interface region {
    id: string;
    name: string;
}
const RegionForm: React.FC<Props> = ({ setRender, submitRegion, countryId }) => {
    const listRegions = useSelector((state: any) => state.signup.listRegions);
    const dispatch = useDispatch();
    const [region, setRegion] = React.useState<region>({
        id: '',
        name: ''
    });
    const onSubmit = () => {
        submitRegion(region);
        setRender('city');
    };
    React.useEffect(() => {
        dispatch(actions.getRegionsRequest(countryId));
    }, []);
    return (
        <>
            <View style={{ height: 550, alignSelf: 'stretch' }}>
                <ButtonBack onPress={() => setRender('country')} />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <Icon name="city" size={40} color="#900" />
                    </View>
                    <Text style={styles.textStyle}>Region Form </Text>
                </View>
                <View style={styles.scrollView}>
                    <FlatList
                        data={listRegions}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.styleCheckbox}>
                                    <Text style={styles.textCheckBox}>{item.name}:</Text>
                                    <View style={styles.radio}>
                                        <RadioButton
                                            color="#FFFFFF"
                                            uncheckedColor="#FFFFFF"
                                            value={item.name}
                                            status={region.id === item.id ? 'checked' : 'unchecked'}
                                            onPress={() => setRegion(item)}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
            <ButtonNext onPress={onSubmit} disable={false} />
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

export default RegionForm;
