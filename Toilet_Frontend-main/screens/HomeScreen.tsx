import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getLocation} from '../services/location';
import {
  StackSimple,
  Star,
  Wheelchair,
  Clock,
  MagnifyingGlass,
  Funnel,
  ForkKnife,
  Tote,
  GasPump,
  House,
  Toilet,
} from 'phosphor-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Buttonmap from '../components/Buttonmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProfileParamList} from '../stacks/ProfileStack';
import {BottomTabParamList} from '../stacks/BottomTabStack';
import {HomeParamList} from '../stacks/HomeStack';
import {getAlltoiletPrivate} from '../services/toilet';
import BottomPopupMap from '../components/BottomPopupMap';
import wc from '../assets/wc.png';

/*const initialState = {
  latitude,
  longitud:null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}*/
async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      // do something if granted...
    }
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
      // do something if granted...
    }
  }
}
interface Position {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
enum MapType {
  standard = 'standard',
  satellite = 'satellite',
  hybrid = 'hybrid',
  terrain = 'terrain',
}

// export type RootStackParamList = {
//   Home: undefined;
//   Profile: undefined;
// };
export const popuplist = [
  {
    id: 1,
    icon: <Toilet size={22} color="#2C2F4A" weight="fill" style={{marginRight: 10}}/>,
    name: 'All',
  },
  {
    id: 2,
    icon: (
      <Image
        source={wc}
        style={{
          height: 20,
          width: 20,
          marginRight: 10,
        }}
      />
    ),
    name: 'Public',
  },
  {
    id: 3,
    icon: (
      <ForkKnife
        size={22}
        color="#2C2F4A"
        weight="fill"
        style={{marginRight: 10}}
      />
    ),
    name: 'Restaurant',
  },
  {
    id: 4,
    icon: (
      <Tote size={22} color="#2C2F4A" weight="fill" style={{marginRight: 10}} />
    ),
    name: 'Store',
  },
  {
    id: 5,
    icon: (
      <GasPump
        size={22}
        color="#2C2F4A"
        weight="fill"
        style={{marginRight: 10}}
      />
    ),
    name: 'Gas station',
  },
  {
    id: 6,
    icon: (
      <House
        size={22}
        color="#2C2F4A"
        weight="fill"
        style={{marginRight: 10}}
      />
    ),
    name: 'House',
  },
];

const HomeScreen = () => {
  const [pos, setPos] = useState<Position>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentType, setCurrentType] = useState(MapType.standard);
  const [aom, setaom] = useState(true);
  function callBoth() {
    if (aom === true) {
      setCurrentType(MapType.hybrid);
      setaom(false);
    } else {
      setCurrentType(MapType.standard);
      setaom(true);
    }
  }
  const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>();
  const [toiletMarkers, setToiletMarkers] = useState<Position[]>([]);
  const [toiletPrivate, settoiletPrivate] = useState<Position[]>([]);
  useEffect(() => {
    requestPermissions();
    Geolocation.getCurrentPosition(
      position => {
        setPos({
          ...pos,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log('position', position);
      },
      err => {
        console.log('err', err);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);
  const [list, setList] = useState(toiletMarkers);
  const [listToiletPrivate, setListToiletPrivate] = useState(toiletMarkers);
  useEffect(() => {
    const fetchData = async () => {
      const aom: any = await getLocation();
      const dataToiletPrivate: any = await getAlltoiletPrivate();
      setList(aom.data);
      setListToiletPrivate(dataToiletPrivate.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const aom: any = await getLocation();
      const dataToiletPrivate: any = await getAlltoiletPrivate();
      // console.log('value97', aom);
      setToiletMarkers(aom.data);
      settoiletPrivate(dataToiletPrivate.data);
      // setIsShowLocation((prev) => !prev);
      // setForceRefresh(Math.floor(Math.random() * 100));
    };
    fetchData();
    // const aom: any = await getLocation();
    // console.log('value97', aom);
    // setToiletMarkers(aom);
  }, [list, listToiletPrivate]);

  const RenderLocation = () => {
    const navigation =
      useNavigation<NativeStackNavigationProp<HomeParamList>>();
    interface Toilet {
      _id: string;
      latitude: number;
      longitude: number;
      title: string;
      contact: string;
      cost: string;
      handicap: boolean;
      free: boolean;
      type: string;
      timeOpen: string;
      timeClose: string;
      toiletpicture: string;
    }
    const [IDtoilet, setIDtoilet] = useState<Toilet | undefined>();
    // const onData = (value: any) => {
    //   setIDtoilet(value);
    //   console.log(IDtoilet);
    // };
    const onClick = () => {
      console.log('call api detail toilet', IDtoilet);
      if (IDtoilet) {
        navigation.navigate('DetailToilet', {
          _id: IDtoilet._id,
          latitude: IDtoilet.latitude,
          longitude: IDtoilet.longitude,
          title: IDtoilet.title,
          contact: IDtoilet.contact,
          cost: IDtoilet.cost,
          handicap: IDtoilet.handicap,
          free: IDtoilet.free,
          type: IDtoilet.type,
          timeOpen: IDtoilet.timeOpen,
          timeClose: IDtoilet.timeClose,
          toiletpicture: IDtoilet.toiletpicture,
        });
      }
    };
    // console.log('data 115', toiletMarkers);
    return (
      <>
        {list.map((item: any, index) => {
          const TagFree = (): JSX.Element | null => {
            if (item.free === true) {
              return (
                <View style={styles.tagFree}>
                  <Text style={styles.textFree}>฿ Free</Text>
                </View>
              );
            } else {
              return null;
            }
          };
          const TagHandicap = (): JSX.Element | null => {
            if (item.handicap === true) {
              return (
                <View style={styles.tagHandicap}>
                  <Wheelchair
                    size={10}
                    weight="fill"
                    color="#00845A"
                    style={{
                      marginRight: 2,
                      marginLeft: 6,
                    }}
                  />
                  <Text style={styles.textHandicap}>Handicap access</Text>
                </View>
              );
            } else {
              return null;
            }
          };
          return (
            <Marker
              image={require('../assets/Map2.png')}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
              description={item._id}
              onPress={() => setIDtoilet(item)}>
              <Callout tooltip onPress={onClick}>
                <View>
                  <View style={styles.bubble}>
                    {/* <Image source={toilet} style={styles.imageToilet} /> */}
                    <View style={styles.itemLeftTop}>
                      <TagFree></TagFree>
                      <TagHandicap></TagHandicap>

                      <View style={styles.tagType}>
                        {/* <Image source={wc} style={styles.iconType} /> */}
                        <Text style={styles.textType}>{item.type}</Text>
                      </View>
                    </View>

                    <Text style={styles.placeName}>{item.title}</Text>

                    <View style={styles.itemBottom}>
                      <View style={styles.itemLeftBottom}>
                        <Clock
                          size={14}
                          weight="fill"
                          color="#31C596"
                          style={{
                            marginRight: 5,
                          }}
                        />
                        <Text style={styles.time}>
                          {item.timeOpen} - {item.timeClose}
                        </Text>
                      </View>
                      <View style={styles.itemRightBottom}>
                        <Star
                          size={14}
                          weight="fill"
                          color="#FBD17B"
                          style={{
                            marginRight: 2,
                          }}
                        />
                        <Text style={styles.rate}>5.0</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </>
    );
  };

  const RenderToiletPrivate = () => {
    const navigation =
      useNavigation<NativeStackNavigationProp<HomeParamList>>();
    interface ToiletPrivate {
      _id: string;
      latitude: number;
      longitude: number;
      title: string;
      contact: string;
      cost: string;
      handicap: boolean;
      free: boolean;
      type: string;
      timeOpen: string;
      timeClose: string;
      toiletpicture: string;
    }
    const [IDtoilet, setIDtoilet] = useState<ToiletPrivate | undefined>();
    const onClick = () => {
      console.log('call api detail toilet', IDtoilet);
      if (IDtoilet) {
        navigation.navigate('DetailToilet', {
          _id: IDtoilet._id,
          latitude: IDtoilet.latitude,
          longitude: IDtoilet.longitude,
          title: IDtoilet.title,
          contact: IDtoilet.contact,
          cost: IDtoilet.cost,
          handicap: IDtoilet.handicap,
          free: IDtoilet.free,
          type: IDtoilet.type,
          timeOpen: IDtoilet.timeOpen,
          timeClose: IDtoilet.timeClose,
          toiletpicture: IDtoilet.toiletpicture,
        });
      }
    };
    return (
      <>
        {listToiletPrivate.map((item: any, index) => {
          const TagFree = (): JSX.Element | null => {
            if (item.free === true) {
              return (
                <View style={styles.tagFree}>
                  <Text style={styles.textFree}>฿ Free</Text>
                </View>
              );
            } else {
              return null;
            }
          };
          const TagHandicap = (): JSX.Element | null => {
            if (item.handicap === true) {
              return (
                <View style={styles.tagHandicap}>
                  <Wheelchair
                    size={10}
                    weight="fill"
                    color="#00845A"
                    style={{
                      marginRight: 2,
                      marginLeft: 6,
                    }}
                  />
                  <Text style={styles.textHandicap}>Handicap access</Text>
                </View>
              );
            } else {
              return null;
            }
          };
          return (
            <Marker
              image={require('../assets/Map.png')}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
              description={item._id}
              onPress={() => setIDtoilet(item)}>
              <Callout tooltip onPress={onClick}>
                <View>
                  <View style={styles.bubble}>
                    {/* <Image source={toilet} style={styles.imageToilet} /> */}
                    <View style={styles.itemLeftTop}>
                      <TagFree></TagFree>
                      <TagHandicap></TagHandicap>

                      <View style={styles.tagType}>
                        {/* <Image source={wc} style={styles.iconType} /> */}
                        <Text style={styles.textType}>{item.type}</Text>
                      </View>
                    </View>

                    <Text style={styles.placeName}>{item.title}</Text>

                    <View style={styles.itemBottom}>
                      <View style={styles.itemLeftBottom}>
                        <Clock
                          size={14}
                          weight="fill"
                          color="#31C596"
                          style={{
                            marginRight: 5,
                          }}
                        />
                        <Text style={styles.time}>
                          {item.timeOpen} - {item.timeClose}
                        </Text>
                      </View>
                      <View style={styles.itemRightBottom}>
                        <Star
                          size={14}
                          weight="fill"
                          color="#FBD17B"
                          style={{
                            marginRight: 2,
                          }}
                        />
                        <Text style={styles.rate}>5.0</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </>
    );
  };

  const [selectedFree, setSelectedFree] = useState(false);
  const [selectedHandicap, setSelectedHandicap] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showbuttompopup, setShowbuttompopup] = useState(false);

  const filterFree = () => {
    if (selectedFree === true) {
      setSelectedFree(false);
    }
    if (selectedFree === false) {
      setSelectedFree(true);
    }
  };

  const filterHandicap = () => {
    if (selectedHandicap === true) {
      setSelectedHandicap(false);
    }
    if (selectedHandicap === false) {
      setSelectedHandicap(true);
    }
  };

  const filterPublic = () => {
    setSelectedType('public');
  };

  const filterGas = () => {
    setSelectedType('gas station');
  };

  const filterStore = () => {
    setSelectedType('store');
  };

  const filterRestaurant = () => {
    setSelectedType('restaurant');
  };

  const filterHome = () => {
    setSelectedType('home');
  };
  const filterAll = () => {
    setSelectedType('');
  };

  const applyFilters = () => {
    let updateToiletMarkers = toiletMarkers;
    let updateToiletPrivate = toiletPrivate;
    //free filter
    if (selectedFree === true) {
      updateToiletMarkers = updateToiletMarkers.filter(
        (item: any) => item.free === true,
      );
      updateToiletPrivate = updateToiletPrivate.filter(
        (item: any) => item.free === true,
      );
    }
    //Handicap filter
    if (selectedHandicap === true) {
      updateToiletMarkers = updateToiletMarkers.filter(
        (item: any) => item.handicap === true,
      );
      updateToiletPrivate = updateToiletPrivate.filter(
        (item: any) => item.handicap === true,
      );
    }
    // Public filter
    if (selectedType !== 'All') {
      updateToiletMarkers = updateToiletMarkers.filter(
        (item: any) => item.type === selectedType,
      );
      updateToiletPrivate = updateToiletPrivate.filter(
        (item: any) => item.type === selectedType,
      );
    }
    setList(updateToiletMarkers);
    setListToiletPrivate(updateToiletPrivate);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedHandicap, selectedFree, selectedType]);
  // console.log(list);
  // console.log(selectedType);

  if (toiletMarkers.length === 0) {
    return (
      <View>
        <Text> reloading </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <MapView
        // onUserLocationChange={e => {
        //   console.log('locationChange', e.nativeEvent);
        // }}
        showsUserLocation={true}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={pos}
        mapType={currentType}
        followsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        showsBuildings={true}
        toolbarEnabled={true}>
        <RenderLocation></RenderLocation>
        <RenderToiletPrivate></RenderToiletPrivate>
        {/* <Marker
          title="test"
          description="KMUTT"
          coordinate={pos}
          image={require('../assets/Map2.png')}
        /> */}
      </MapView>
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: 25, //for center align
          right: 25,
          alignSelf: 'flex-end', //for align to right
        }}>
        <SafeAreaView>
          <TouchableOpacity style={styles.btnStackSimple_44} onPress={callBoth}>
            <StackSimple size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSearch_44}
            onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlass size={22} weight="bold" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFilter_44}
            onPress={() => setShowbuttompopup(true)}>
            <Funnel size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <BottomPopupMap
            title="Filter"
            show={showbuttompopup}
            data={popuplist}
            close={() => setShowbuttompopup(false)}
            onSelected={value => {
              setSelectedType(value);
              setShowbuttompopup(false);
            }}
            onSelectedFree={value => {
              setSelectedFree(value);
              setShowbuttompopup(false);
            }}
            onSelectedHandicap={value => {
              setSelectedHandicap(value);
              setShowbuttompopup(false);
            }}
          />

          {/* <TouchableOpacity style={styles.btnBaht_44} onPress={filterFree}>
            <Text style={styles.baht}>฿</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnWheelchair_44}
            onPress={filterHandicap}>
            <Wheelchair size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWc_44} onPress={filterPublic}>
            <Image source={wc} style={styles.iconPublic} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnForkKnife_44}
            onPress={filterRestaurant}>
            <ForkKnife size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnTote_44} onPress={filterStore}>
            <Tote size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnGasPump_44} onPress={filterGas}>
            <GasPump size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnHouse_44} onPress={filterHome}>
            <House size={22} weight="fill" color="#2C2F4A" />
          </TouchableOpacity> */}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // Button StackSimple
  btnStackSimple_44: {
    position: 'absolute',
    width: 39,
    height: 39,
    borderRadius: 3,
    backgroundColor: '#fff',
    top: 85,
    left: 13.5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },

  // Button Search
  btnSearch_44: {
    position: 'absolute',
    width: 39,
    height: 39,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 32,
    right: 335,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },

  btnFilter_44: {
    width: 39,
    height: 39,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 35,
    marginBottom: 10,
    left: 13.5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },

  // btnBaht_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // baht: {
  //   fontSize: 18,
  //   fontFamily: 'Fredoka-Medium',
  //   color: '#2C2F4A',
  // },
  // btnWheelchair_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // btnWc_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // iconPublic: {
  //   width: 22,
  //   height: 22,
  //   opacity: 0.8,
  // },
  // btnForkKnife_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // btnTote_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // btnGasPump_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },
  // btnHouse_44: {
  //   width: 39,
  //   height: 39,
  //   borderRadius: 3,
  //   backgroundColor: '#fff',
  //   marginBottom: 10,
  //   left: 13.5,
  //   elevation: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: 0.8,
  // },

  // Callout
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#2C2F4A',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 273,
  },
  imageToilet: {
    width: 273,
    height: 80,
  },
  itemLeftTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // Tag Free
  tagFree: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginRight: 2,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textFree: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#00845A',
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
  },

  // Tag Handicap
  tagHandicap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginRight: 2,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textHandicap: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#00845A',
    paddingRight: 6,
    paddingVertical: 2,
  },

  // Tag Type
  tagType: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginRight: 2,
    backgroundColor: '#CACCDA',
    borderRadius: 20,
  },
  iconType: {
    width: 10,
    height: 10,
    marginRight: 2,
    marginLeft: 6,
    opacity: 0.6,
  },
  textType: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#555568',
    marginLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
  },

  placeName: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },

  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeftBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  time: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    color: '#ABADBB',
  },
  itemRightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rate: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    color: '#fff',
  },

  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#2C2F4A',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#2C2F4A',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
});
