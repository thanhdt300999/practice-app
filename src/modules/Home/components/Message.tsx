import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    LogBox,
} from 'react-native';
import { Dimensions } from 'react-native';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { RootState } from '../../../config-redux/rootReducer';
import action from '../redux/action';
import actions from '../../auth/signin/redux/actions';

interface Props {}
const Item = ({ title, url, age, location }) => (
    <View style={styles.shadowProp}>
        <View style={styles.userBox}>
            <Image
                style={styles.userImage}
                source={{
                    uri: url,
                }}
            />
            <Text style={{ fontSize: 20 }}>{title}</Text>
            <View style={styles.userInfo}>
                <View style={styles.userAge}>
                    <Text style={{ fontSize: 10 }}>{age} ans</Text>
                </View>
                <View style={styles.userLocation}>
                    <Icon1 name="location-pin" />
                    <Text style={{ fontSize: 10 }}>{location}</Text>
                </View>
            </View>
        </View>
    </View>
);
const MessageScreen: React.FC<Props> = ({}) => {
    const [checked, setChecked] = React.useState('unchecked');
    const [isFetching, setFetching] = React.useState(false);
    const renderItem = ({ item }) => (
        <Item url={item.thumbnail} age={item.age} location={item.country} title={item.name} />
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [x, setX] = React.useState(0);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.home);
    const getItemLayout = (data, index) => ({
        length: 70,
        offset: 70 * index,
        index,
    });
    React.useEffect(() => {
        dispatch(action.getUsersRequest());
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    const onRefresh = () => {
        dispatch(action.getUsersRequest());
    };
    return (
        <>
            <Text>Message Screen</Text>
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 180,
    },
    banner: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 25,
        justifyContent: 'space-between',
    },
    headerButton: {
        width: 150,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#24cf5f',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textHeader: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    textButton: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    userBox: {
        marginTop: 25,
        margin: 15,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 15,
        borderWidth: 1,
    },
    userImage: {
        width: 140,
        height: 160,
        borderRadius: 10,
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 5,
    },
    userAge: {
        borderRightColor: '#000000',
        borderRightWidth: 1,
        paddingRight: 20,
    },
    userLocation: {
        marginLeft: 5,
        flexDirection: 'row',
    },
    shadowProp: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default withNavigation(MessageScreen);
