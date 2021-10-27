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
} from 'react-native';
import Text from '../../../assets/AppText';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {RootState} from '../../redux/config-redux/rootReducer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import action from '../../redux/actions/home.actions';
import LinearGradient from 'react-native-linear-gradient';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const width: number = Dimensions.get('window').width; //full width
const MARGIN = (width - 312) / 4;
interface Props {}

const Item = ({title, url, age, location}) => (
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
      <Text style={{fontSize: 20}}>{title}</Text>
      <View style={styles.userInfo}>
        <View style={styles.userAge}>
          <Text style={{fontSize: 10}}>{age} ans</Text>
        </View>
        <View style={styles.userLocation}>
          <Icon1 name="location-pin" />
          <Text style={{fontSize: 10}}>{location}</Text>
        </View>
      </View>
    </View>
  </View>
);
const Discovery: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.home);
  const scrollY: any = new Animated.Value(0);
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
    style: {marginVertical: 5},
  };
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 60],
    extrapolate: 'clamp',
  });
  const renderItem = ({item}) => {
    if (state.isLoading) {
      return <View></View>;
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
  const listHeaderComponent = () => (
    <View style={styles.listHeaderComponent}>
      <Image
        style={styles.image}
        source={require('../../../image/menuBar.jpg')}
      />
      <View style={styles.banner}>
        <Text style={styles.textHeader}>Votre Recherche</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="linechart" color="#ffffff" size={25} />
          <Text style={styles.textButton}>CRITERES</Text>
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
  }, []);
  const onRefresh = () => {
    dispatch(action.getUsersRequest());
  };
  const onReset = () => {
    dispatch(action.getUsersRequest());
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? '0' : 10,
          }}>
          <FlatList
            ListHeaderComponent={listHeaderComponent}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={state.listUsers}
            renderItem={renderItem}
            keyExtractor={item => item.uuid.toString()}
            getItemLayout={getItemLayout}
            removeClippedSubviews={true}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={state.isLoading}
              />
            }
            scrollEventThrottle={16}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={7} // Reduce the window size
          />
        </View>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={styles.bar}>
            <View
              style={{
                marginLeft: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={onReset}>
                <MaterialIcons name="settings-backup-restore" size={30} />
              </TouchableOpacity>
              <Text>Reset</Text>
            </View>
            <Text style={{fontSize: 25}}> Decouvir </Text>
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <Entypo
                name="save"
                style={{marginHorizontal: 10}}
                size={25}
                color="green"
              />
              <FontAwesome name="sort-amount-desc" color="green" size={25} />
            </View>
          </View>
          <LinearGradient
            style={{flex: 1}}
            colors={[
              '#999999',
              '#a8a8a8',
              '#e3e3e3',
              '#ffffff',
            ]}></LinearGradient>
        </Animated.View>
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
    margin: MARGIN,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
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
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 24,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  bar: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  listHeaderComponent: {
    width: width,
  },
});

export default Discovery;
