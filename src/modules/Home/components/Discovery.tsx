import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
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
    <View
        style={{
            marginTop: 25,
            margin: 15,
            borderWidth: 1,
            borderColor: '#000000',
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 15,
        }}
    >
        <Image
            style={{ width: 140, height: 120, borderRadius: 10 }}
            source={{
                uri: url,
            }}
        />
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ borderRightColor: '#000000', borderRightWidth: 1, paddingRight: 20 }}>
                <Text style={{ fontSize: 10 }}>{age} ans</Text>
            </View>
            <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                <Icon1 name="location-pin" />
                <Text style={{ fontSize: 10 }}>{location}</Text>
            </View>
        </View>
    </View>
);
const Discovery: React.FC<Props> = ({}) => {
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
    }, []);
    const onRefresh = () => {
        setFetching(true);
        console.log('abc');
    };
    return (
        <>
            <Image style={styles.image} source={require('../../../../image/menuBar.jpg')} />
            <View style={styles.banner}>
                <Text style={styles.textHeader}>Votre Recherche</Text>
                <TouchableOpacity onPress={() => setX(x + 1)} style={styles.headerButton}>
                    <Icon name="linechart" color="#ffffff" size={25} />
                    <Text style={styles.textButton}>CRITERES</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', height: 400 }}>
                <FlatList
                    numColumns={2}
                    data={state.listUsers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uuid.toString()}
                    getItemLayout={getItemLayout}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                />
            </View>
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
});

export default withNavigation(Discovery);
