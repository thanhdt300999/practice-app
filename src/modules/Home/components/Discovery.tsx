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
    Animated,
    SafeAreaView,
} from 'react-native';
import { Dimensions } from 'react-native';
import Text from '../../../../assets/AppText';
import { useForm, Controller } from 'react-hook-form';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { RootState } from '../../../config-redux/rootReducer';
import { MaterialIcons, Entypo, FontAwesome } from 'react-native-vector-icons';
import action from '../redux/action';

interface Props {}

const Item = ({ title, url, age, location }) => (
    <View style={styles.shadowProp}>
        <View style={styles.userBox}>
            <View>
                <Image
                    style={styles.userImage}
                    source={{
                        uri: url,
                    }}
                />
                <View style={styles.icon}>
                    <FontAwesome name="circle" color="#8cff12" size={15} />
                </View>
            </View>
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
const Discovery: React.FC<Props> = ({}) => {
    const [checked, setChecked] = React.useState('unchecked');
    const [isFetching, setFetching] = React.useState(false);
    const [showHeader, setShowHeader] = React.useState(false);
    const [trigger, setTrigger] = React.useState(false);
    const scrollY = new Animated.Value(0);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.home);
    const translateY: any = scrollY.interpolate({
        inputRange: [230, 281],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });
    const renderItem = ({ item }) => (
        <Item url={item.thumbnail} age={item.age} location={item.country} title={item.name} />
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
            <Animated.View
                style={[
                    styles.header,
                    { height: translateY, transform: [{ translateY: translateY }] },
                ]}
            >
                <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="settings-backup-restore" size={30} />
                    <Text>Reset</Text>
                </View>
                <Text style={{ fontSize: 25 }}> Decouvir </Text>
                <View style={{ flexDirection: 'row', marginRight: 15 }}>
                    <Entypo name="save" size={30} color="green" />
                    <FontAwesome name="sort-amount-desc" color="green" size={30} />
                </View>
            </Animated.View>

            <SafeAreaView>
                <ScrollView
                    refreshControl={
                        <RefreshControl onRefresh={onRefresh} refreshing={state.isLoading} />
                    }
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    style={{ backgroundColor: '#f7fff0' }}
                >
                    <Image style={styles.image} source={require('../../../../image/menuBar.jpg')} />

                    <View style={styles.banner}>
                        <Text style={styles.textHeader}>Votre Recherche</Text>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="linechart" color="#ffffff" size={25} />
                            <Text style={styles.textButton}>CRITERES</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <FlatList
                            scrollEnabled={false}
                            nestedScrollEnabled
                            numColumns={2}
                            data={state.listUsers}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.uuid.toString()}
                            getItemLayout={getItemLayout}
                            removeClippedSubviews={true}
                            initialNumToRender={2} // Reduce initial render amount
                            maxToRenderPerBatch={1} // Reduce number in each render batch
                            updateCellsBatchingPeriod={100} // Increase time between renders
                            windowSize={7} // Reduce the window size
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
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
        backgroundColor: '#ffffff'
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
    shadowProp: {},
    bar: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    header: {
        zIndex: 3,
        marginTop: -10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
        backgroundColor: '#ffffff',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withNavigation(Discovery);
