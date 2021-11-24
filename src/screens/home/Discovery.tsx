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
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import Text from '../../../assets/AppText';
import { useDispatch, useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { RootState } from '../../redux/config-redux/rootReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import action from '../../redux/actions/home-actions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const height: number = Dimensions.get('window').height;
const HEADER_MAX_HEIGHT: number = height * 1;
const HEADER_MIN_HEIGHT: number = height * 0.3 + 10;
const HEADER_SCROLL_DISTANCE: number = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const width: number = Dimensions.get('window').width; //full width
const MARGIN: number = width * 0.07;
interface Props {}

const Item = ({ title, url, age, location }) => (
    <View style={Platform.OS === 'ios' ? styles.shadowProp : null}>
        <View style={styles.userBox}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.userImage}
                    source={{
                        uri: url,
                    }}
                />
                <View style={styles.iconOnline}>
                    <FontAwesome name="circle" color="#24cf5f" size={height * 0.025} />
                </View>
            </View>
            <Text style={styles.userName}>{title}</Text>
            <View style={styles.userInfo}>
                <View style={styles.userAge}>
                    <Text style={{ fontSize: height * 0.015, color: '#a1a4a8' }}>{age} ans</Text>
                </View>
                <View style={styles.userLocation}>
                    <Entypo color="#a1a4a8" name="location-pin" />
                    <Text style={{ fontSize: height * 0.015, color: '#a1a4a8' }}>{location}</Text>
                </View>
            </View>
        </View>
    </View>
);
const listHeaderComponent = () => (
    <View style={styles.listHeaderComponent}>
        <ImageBackground style={styles.image} source={require('../../../image/discovery.jpg')}>
            <View style={{ position: 'absolute', bottom: 50, left: 20 }}>
                <Text
                    style={{
                        fontSize: 45,
                        color: '#fff',
                    }}
                >
                    Rencontre
                </Text>
                <Text style={{ color: '#fff', fontSize: 16, marginTop: 10 }}>
                    Découvrez les profils et faites une rencontre !
                </Text>
            </View>
            <View
                style={{
                    borderRightWidth: width,
                    borderRightColor: 'white',
                    borderTopWidth: 35,
                    borderTopColor: 'transparent',
                    opacity: 0.85,
                    position: 'absolute',
                    bottom: 0,
                }}
            ></View>
            <View
                style={{
                    borderLeftWidth: width,
                    borderLeftColor: 'white',
                    borderTopWidth: 35,
                    borderTopColor: 'transparent',
                    opacity: 0.85,
                    position: 'absolute',
                    bottom: 0,
                }}
            ></View>
        </ImageBackground>
        <View style={styles.banner}>
            <Text style={styles.textHeader}>Votre Recherche</Text>
            <TouchableOpacity style={styles.headerButton}>
                <FontAwesome name="sort-amount-desc" color="#ffffff" size={height * 0.025} />
                <Text style={styles.textButton}>CRITERES</Text>
                <View style={styles.resetInfo}>
                    <Text style={styles.resetText}>0</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View
            style={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#ccc',
                marginTop: 25,
                width: width * 0.1,
            }}
        ></View>
    </View>
);
const listFooterComponent = () => (
    <SkeletonPlaceholder>
        <View style={styles.footerLoading}>
            <View style={styles.loadingBox}></View>
            <View style={styles.loadingBox}></View>
        </View>
        <View style={styles.footerLoading}>
            <View style={styles.loadingBox}></View>
            <View style={styles.loadingBox}></View>
        </View>
        <View style={styles.footerLoading}>
            <View style={styles.loadingBox}></View>
            <View style={styles.loadingBox}></View>
        </View>
    </SkeletonPlaceholder>
);

const Discovery: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.home);
    const scrollY: any = new Animated.Value(0);
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const renderItem = ({ item }) => {
        if (state.isLoadingGetUsers) {
            return null;
        } else {
            return (
                <Item
                    url={item.thumbnail}
                    age={item.age}
                    location={item.country}
                    title={item.name}
                />
            );
        }
    };
    React.useEffect(() => {
        dispatch(action.getUsersRequest());
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreLogs(['fontFamily']);
        LogBox.ignoreLogs(['Encountered two children with']);
    }, []);
    const onRefresh = () => {
        state.isLoading === false && dispatch(action.getUsersRequest());
    };
    const handleGetUsers = () => {
        state.isLoading === false && dispatch(action.getMoreUsersRequest());
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                }}
            >
                <FlatList
                    ListHeaderComponent={listHeaderComponent}
                    ListFooterComponent={listFooterComponent}
                    numColumns={2}
                    data={state.listUsers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uuid.toString()}
                    removeClippedSubviews={true}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginHorizontal: MARGIN,
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={['red', 'tomato']}
                            onRefresh={onRefresh}
                            refreshing={state.isLoadingGetUsers}
                            progressViewOffset={Platform.OS === 'ios' ? null : height * 0.1}
                        />
                    }
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        let offset = e.nativeEvent.contentOffset.y;
                        scrollY.setValue(offset);
                    }}
                    initialNumToRender={400}
                    onEndReached={handleGetUsers}
                    onEndReachedThreshold={0.7}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={200}
                />
            </View>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.abc}>
                    <View style={styles.bar}>
                        <View
                            style={{
                                marginLeft: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleGetUsers}>
                                <AntDesign name="reload1" size={height * 0.025} />
                            </TouchableOpacity>
                            <Text
                                style={{ color: '#000', fontSize: height * 0.022, marginLeft: 5 }}
                            >
                                Reset
                            </Text>
                        </View>
                        <Text style={{ fontSize: height * 0.03, color: '#000', marginLeft: 10 }}>
                            {' '}
                            Découvrir{' '}
                        </Text>
                        <View style={{ flexDirection: 'row', marginRight: 30 }}>
                            <View
                                style={{
                                    marginHorizontal: 20,
                                    borderWidth: 1,
                                    borderColor: '#24cf5f',
                                    padding: 5,
                                    borderRadius: 6,
                                }}
                            >
                                <Entypo name="save" size={height * 0.022} color="#24cf5f" />
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <FontAwesome
                                    name="sort-amount-desc"
                                    color="#24cf5f"
                                    size={height * 0.022}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: '#24cf5f',
                                position: 'absolute',
                                top: 5,
                                right: 15,
                                height: 12,
                                width: 12,
                                borderRadius: 3,
                                // marginLeft: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 9, textAlign: 'center' }}>
                                1
                            </Text>
                        </View>
                    </View>
                </View>
                {state.isLoading == true && Platform.OS === 'ios' && (
                    <View style={styles.backgroundLoading}>
                        <ActivityIndicator color="black" size="small" />
                    </View>
                )}
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: height * 0.285,
        width: 450,
    },
    banner: {
        flexDirection: 'row',
        marginHorizontal: width * 0.06,
        marginTop: height * 0.03,
        justifyContent: 'space-between',
    },
    headerButton: {
        width: width * 0.33,
        borderRadius: 8,
        height: height * 0.075,
        backgroundColor: '#24cf5f',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textHeader: {
        marginLeft: 4,
        fontSize: height * 0.03,
        fontFamily:
            Platform.OS === 'android' ? 'AvenirNextCondensed_Bold' : 'Avenir Next Condensed Medium',
        color: '#4a5057',
    },
    textButton: {
        color: '#ffffff',

        fontSize: height * 0.02,
        marginLeft: 3,
    },
    userBox: {
        marginTop: 25,
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        elevation: 1,
        width: width * 0.4,
    },
    userImage: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: 10,
    },
    iconOnline: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ffffff',
        width: height * 0.03,
        height: height * 0.03,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        right: 7,
    },
    userName: {
        fontSize: height * 0.02,
        color: '#362e2e',
        marginLeft: width * 0.025,
        marginTop: 7,
        fontFamily:
            Platform.OS === 'android' ? 'AvenirNextCondensed_Bold' : 'Avenir Next Condensed Medium',
    },
    userInfo: {
        flexDirection: 'row',
        marginTop: 5,
        marginHorizontal: width * 0.025,
        overflow: 'hidden',
    },
    userAge: {
        paddingRight: 15,
        color: '#74797f',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
    },
    userLocation: {
        marginLeft: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        color: '#a1a4a8',
        alignItems: 'center',
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: 'white',
        fontSize: 18,
    },
    header: {
        top: Platform.OS === 'ios' ? getStatusBarHeight(true) : null,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#fffff',
        overflow: 'hidden',
        elevation: 3,
    },
    bar: {
        backgroundColor: '#ffffff',
        height: Platform.OS === 'ios' ? height * 0.06 : height * 0.08,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
    },
    listHeaderComponent: {
        width: width,
    },
    resetInfo: {
        height: height * 0.02,
        width: height * 0.025,
        backgroundColor: '#fcfcfc',
        borderRadius: 3,
        position: 'absolute',
        top: 3,
        right: 5,
    },
    resetText: {
        fontSize: height * 0.015,
        textAlign: 'center',
    },
    line: {
        borderWidth: 1,
        borderColor: '#000',
        position: 'absolute',
        bottom: 0,
        height: 30,
        width: width,
    },
    abc: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    backgroundLoading: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        position: 'absolute',
        top: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 30,
    },
    footerLoading: {
        flexDirection: 'row',
        marginHorizontal: width * 0.07,
        justifyContent: 'space-between',
    },
    loadingBox: {
        marginTop: 20,
        width: width * 0.41,
        height: width * 0.5,
        borderRadius: 15,
    },
});

export default Discovery;
