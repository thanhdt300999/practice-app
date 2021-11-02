import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    LogBox,
    Animated,
    SafeAreaView,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native';
import Text from '../../../assets/AppText';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { RootState } from '../../redux/config-redux/rootReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import action from '../../redux/actions/home.actions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const height = Dimensions.get('window').height;
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = height * 0.05 + 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const width: number = Dimensions.get('window').width; //full width
const MARGIN = (width * 0.3 - 32) / 4;
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
            <Text style={{ fontSize: height * 0.03 }}>{title}</Text>
            <View style={styles.userInfo}>
                <View style={styles.userAge}>
                    <Text style={{ fontSize: height * 0.015 }}>{age} ans</Text>
                </View>
                <View style={styles.userLocation}>
                    <Icon1 name="location-pin" />
                    <Text style={{ fontSize: height * 0.015 }}>{location}</Text>
                </View>
            </View>
        </View>
    </View>
);
const Discovery: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.home);
    const scrollY: any = new Animated.Value(0);
    const [reset, setReset] = React.useState<number>(0)
    const translateY: any = scrollY.interpolate({
        inputRange: [230, 281],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });
    const shadowOpt: object = {
        width: 160,
        height: 170,
        color: '#000',
        border: 2,
        radius: 3,
        opacity: 0.2,
        x: 0,
        y: 3,
        style: { marginVertical: 5 },
    };
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const renderItem = ({ item }) => {
        // if (state.isLoading) {
        //     return <View></View>;
        // } else {
        return (
            <Item url={item.thumbnail} age={item.age} location={item.country} title={item.name} />
        );
        // }
    };
    const listHeaderComponent = () => (
        <View style={styles.listHeaderComponent}>
            <Image style={styles.image} source={require('../../../image/menuBar.jpg')} />
            <View style={styles.banner}>
                <Text style={styles.textHeader}>Votre Recherche</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Icon name="linechart" color="#ffffff" size={height * 0.03} />
                    <Text style={styles.textButton}>CRITERES</Text>
                    <View style={styles.resetInfo}>
                        <Text style={styles.resetText}>{reset}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
    const getItemLayout = (data, index) => ({
        length: 70,
        offset: 70 * index,
        index,
    });
    React.useEffect(() => {
        dispatch(action.getUsersRequest());
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreLogs(['fontFamily']);
        LogBox.ignoreLogs(['Encountered two children with']);
    }, []);
    const onRefresh = () => {
        dispatch(action.getUsersRequest());
        state.isLoading === false && setReset(reset + 1)
        
    };
    const onReset = () => {
        dispatch(action.getUsersRequest());
        state.isLoading === false && setReset(reset + 1)
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <FlatList
                    ListHeaderComponent={listHeaderComponent}
                    numColumns={2}
                    data={state.listUsers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uuid.toString()}
                    removeClippedSubviews={true}
                    refreshControl={
                        <RefreshControl
                            colors={['red', 'tomato']}
                            onRefresh={onRefresh}
                            refreshing={state.isLoading}
                            progressViewOffset={Platform.OS === "ios" ? null : height*0.1}
                        />
                    }
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    initialNumToRender={10} // Reduce initial render amount
                    onEndReached={() =>
                        state.isLoading === false && dispatch(action.getUsersRequest())
                    }
                    onEndReachedThreshold={0.9}
                    maxToRenderPerBatch={5} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                />
            </View>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.bar}>
                    <View
                        style={{
                            marginLeft: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={onReset}>
                            <MaterialCommunityIcons name="restore" size={height * 0.03} />
                        </TouchableOpacity>
                        <Text>Reset</Text>
                    </View>
                    <Text style={{ fontSize: height * 0.03 }}> Decouvir </Text>
                    <View style={{ flexDirection: 'row', marginRight: 15 }}>
                        <Entypo
                            name="save"
                            style={{ marginHorizontal: 10 }}
                            size={height * 0.03}
                            color="green"
                        />
                        <FontAwesome name="sort-amount-desc" color="green" size={height * 0.03} />
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: height * 0.25,
    },
    banner: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: height * 0.03,
        justifyContent: 'space-between',
    },
    headerButton: {
        width: width * 0.35,
        borderRadius: 5,
        height: height * 0.07,
        backgroundColor: '#24cf5f',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textHeader: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
    },
    textButton: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: height * 0.02,
        marginLeft: 3,
    },
    userBox: {
        marginTop: 25,
        margin: MARGIN,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 15,
        backgroundColor: '#ffffff',
    },
    userImage: {
        width: width * 0.35,
        height: height * 0.2,
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: 'white',
        fontSize: 18,
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

    header: {
        top: Platform.OS === 'ios' ? getStatusBarHeight(true) : null,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#f2f2f2',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bar: {
        paddingTop: height*0.01,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    listHeaderComponent: {
        width: width,
    },
    resetInfo: {
        height: height* 0.025,
        width: height* 0.03,
        backgroundColor: '#fff',
        borderRadius: 3,
        position: 'absolute',
        top: 3,
        right: 5
    },
    resetText: {
        fontSize: height*0.02,
        textAlign: 'center',
        
    }
});

export default Discovery;
