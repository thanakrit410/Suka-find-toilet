import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getLocation} from '../services/location';
import {StackSimple, CaretLeft} from 'phosphor-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Buttonmap from '../components/Buttonmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AddToiletParamList} from '../stacks/AddToiletStack';
import {getProfile} from '../services/auth';
import LinearGradient from 'react-native-linear-gradient';

export interface IProfile {
  _id: string;
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
const AddToilet = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AddToiletParamList>>();

  const [profile, setProfile] = React.useState<IProfile>({
    _id: '',
  });
  const getUserProfile = async () => {
    const {data} = await getProfile();
    setProfile(data);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const gotoAddToilet = () => {
    navigation.navigate('AddDetailToilet2', {
      _id: profile._id,
      latitude: pos.latitude,
      longitude: pos.longitude,
    });
  };

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
  const selectLocation = () => {
    console.log('selectLocation');
    const location = {
      latitude: pos.latitude,
      longitude: pos.longitude,
    };
    console.log(location);
    // navigation.navigate('AddT2');
  };
  // const [toiletMarkers, setToiletMarkers] = useState<Position[]>([]);
  useEffect(() => {
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const aom: any = await getLocation();
  //     setToiletMarkers(aom.data);
  //   };
  //   fetchData();
  // }, []);
  // const RenderLocation = () => {
  //   return (
  //     <>
  //       {toiletMarkers.map((item: any, index) => {
  //         return (
  //           <Marker
  //             key={index}
  //             coordinate={{
  //               latitude: item.latitude,
  //               longitude: item.longitude,
  //             }}
  //             title={item.title}></Marker>
  //         );
  //       })}
  //     </>
  //   );
  // };

  // if (toiletMarkers.length === 0) {
  //   return (
  //     <View>
  //       <Text> reloading </Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}>
          <CaretLeft size={24} color="#F4F6FD" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adding a toilet</Text>
      </View>
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
        // zoomControlEnabled={true}
        showsBuildings={true}>
        {/* <RenderLocation></RenderLocation> */}
        <Marker
          image={require('../assets/Map2.png')}
          title="test"
          description={profile._id}
          coordinate={pos}
        />
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
        </SafeAreaView>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={gotoAddToilet} style={styles.btnSubmit}>
          <Text style={styles.txtSubmit}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddToilet;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  header: {
    backgroundColor: '#2C2F4A',
    height: 52,
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
  },
  btnBack: {
    position: 'absolute',
    left: 16,
    top: 14,
  },
  headerTitle: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 24,
    color: '#F4F6FD',
    left: 26,
  },

  btnStackSimple_44: {
    position: 'relative',
    width: 39,
    height: 39,
    borderRadius: 3,
    backgroundColor: '#fff',
    top: 88,
    left: 13.5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  container: {
    marginHorizontal: 12,
  },
  btnSubmit: {
    backgroundColor: '#6D7DD3',
    width: '100%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    elevation: 4,
  },
  txtSubmit: {
    fontFamily: 'Fredoka-SemiBold',
    color: '#F4F6FD',
    fontSize: 16,
  },
});
