import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    Platform,
} from 'react-native';
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
import globalStyles from './globalStyle'
const height = Dimensions.get('window').height;
const marginTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.04;
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
            {console.log(state.isLoading)}
            <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <FontAwesome5 name="city" size={height * 0.03} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quelle est votre region ? </Text>
                </View>
                {state.isLoading === false && (
                    <FlatList
                        data={state.listRegions}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.styleCheckbox}
                                    onPress={() => setRegion(item)}
                                >
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
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl
                                colors={['red', 'tomato']}
                                refreshing={state.isLoading}
                                progressViewOffset={Platform.OS === 'ios' ? null : height * 0.1}
                            />
                        }
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
        marginBottom: height * 0.03,
        marginTop: marginTop,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: height * 0.03,
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
        fontSize: height * 0.02,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    radio: {
        alignSelf: 'flex-end',
    },
});

export default RegionScreen;
