import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../assets/AppText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import actions from '../../../redux/actions/signup.actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
const height = Dimensions.get('window').height;
interface Props {}
interface region {
    id: string;
    name: string;
}
const RegionScreen: React.FC<Props> = ({}) => {
    const state = useSelector((state: RootState) => state.signup);
    const dispatch = useDispatch();
    const [region, setRegion] = React.useState<region>({
        id: '',
        name: '',
    });
    const navigation = useNavigation();
    const onSubmit = () => {
        navigation.navigate('City');
        dispatch(actions.setRegion(region.id));
    };
    React.useEffect(() => {
        dispatch(actions.getRegionsRequest(state.dataPostLogin.country.id));
    }, []);
    return (
        <LinearGradient
            colors={['#FF5978', '#FF59F4']}
            style={{ flex: 1, backgroundColor: '#FF5978' }}
            useAngle={true}
            angle={0}
            angleCenter={{ x: 0.5, y: 0.5 }}
            locations={[0, 1]}
        >
            <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <View style={styles.header}>
                    <View style={styles.iconStyle}>
                        <FontAwesome5 name="city" size={height * 0.04} color="#fff" />
                    </View>
                    <Text style={styles.textStyle}>Quelle est votre region ? </Text>
                </View>
                {state.isLoading === false && (
                    <FlatList
                        data={state.listRegions}
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
                )}
            </View>
            <ButtonNext onPress={onSubmit} disable={region.id === '' ? true : false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    iconStyle: {
        height: height * 0.1,
        width: height * 0.1,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 2,
        marginBottom: height * 0.03,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: height * 0.04,
        marginBottom: 10,
    },
    styleCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    textCheckBox: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default RegionScreen;
