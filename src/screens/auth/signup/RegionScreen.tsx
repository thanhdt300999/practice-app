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
import actions from '../../../redux/actions/signup-actions';
import { RootState } from '../../../redux/config-redux/rootReducer';
import { useNavigation } from '@react-navigation/native';
import ButtonBack from '../../../components/button/ButtonBack';
import { RadioButton } from 'react-native-paper';
import ButtonNext from '../../../components/button/ButtonNext';
import globalStyles from './globalStyle';
import { showMessage, hideMessage } from 'react-native-flash-message';
const height: number = Dimensions.get('window').height;
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
        if (region.id !== '') {
            navigation.navigate('City');
            dispatch(actions.setRegion(region.id));
        } else {
            showMessage({
                message: 'Le champ est vide',
                color: 'white',
                backgroundColor: '#ff2c2c',
                textStyle: { fontFamily: 'Avenir Next Condensed' },
                style: { alignItems: 'center' },
            });
        }
    };
    React.useEffect(() => {
        dispatch(actions.getRegionsRequest(state.dataPostLogin.country.id));
    }, []);
    return (
        <LinearGradient
            colors={['#FF59F4', '#FF5978']}
            style={{ flex: 1}}
        >
            <View style={{ height: height * 0.8, alignSelf: 'stretch' }}>
                <ButtonBack
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <View style={globalStyles.header}>
                    <View style={globalStyles.iconStyle}>
                        <FontAwesome5 name="city" size={height * 0.025} color="#fff" />
                    </View>
                    <Text style={globalStyles.textFormStyle}>Quelle est votre region ? </Text>
                </View>
                {state.isLoading === false && (
                    <FlatList
                        data={state.listRegions}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={globalStyles.styleCheckbox}
                                    onPress={() => setRegion(item)}
                                >
                                    <Text style={globalStyles.textCheckbox}>{item.name}</Text>
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
                        // refreshControl={
                        //     <RefreshControl
                        //         colors={['red', 'tomato']}
                        //         refreshing={false}
                        //         progressViewOffset={Platform.OS === 'ios' ? null : height * 0.1}
                        //     />
                        // }
                    />
                )}
            </View>
            <ButtonNext onPress={onSubmit} disable={false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    radio: {
        alignSelf: 'flex-end',
    },
});

export default RegionScreen;
