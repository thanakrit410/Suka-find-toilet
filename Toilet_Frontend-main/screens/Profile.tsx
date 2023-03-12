import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  RefreshControl,
} from 'react-native';
import bgSUKA from '../assets/bgSUKA_4.png';
import profile from '../assets/profile.jpg';
import LinearGradient from 'react-native-linear-gradient';
import {
  Bell,
  PencilSimple,
  Toilet,
  CaretRight,
  ClockCounterClockwise,
  SignOut,
} from 'phosphor-react-native';
import RequireLogin from '../components/RequireLogin';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../stacks/RootStack';
import {ProfileParamList} from '../stacks/ProfileStack';
import {getProfile} from '../services/auth';
// const {isLoggedIn} = useContext(AuthContext);
const {width} = Dimensions.get('window');
const aspectRatio = 500 / 500;
const height = width * aspectRatio;

export interface IProfile {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  profile_picture: string;
}

function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();
  const navigationProfile =
    useNavigation<NativeStackNavigationProp<ProfileParamList>>();
  const [profile, setProfile] = React.useState<IProfile>({
    _id: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    profile_picture:
      'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png',
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const {isLoggedIn, setLoggedIn} = useContext(AuthContext);
  const handleLogout = async () => {
    setLoggedIn(false);
    await AsyncStorage.removeItem('token');
    navigation.replace('MainStack', {screen: 'HomeStack'});
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getProfile().finally(() => {
      setRefreshing(false);
    });
  };
  // const [firstname, setFirstname] = useState<IProfile['firstname']>('');
  // const [lastname, setLastname] = useState<IProfile['lastname']>('');
  // const [phone, setPhone] = useState<IProfile['phone']>('');
  // const [email, setEmail] = useState<IProfile['email']>('');

  const getUserProfile = async () => {
    const {data} = await getProfile();
    console.log('user profile ', data);
    setProfile(data);
  };
  const onSubmitEditProfile = () => {
    console.log('call api update profile');
  };

  const gotoEdit = () => {
    navigationProfile.navigate('UpdateProfile', {
      _id: profile._id,
      firstname: profile.firstname,
      lastname: profile.lastname,
      phone: profile.phone,
      email: profile.email,
      profile_picture: profile.profile_picture,
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const res = await getProfile();
  //     console.log(res);
  //   };
  //   fetchProfile();
  // }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <View
            // borderBottomLeftRadius={60}
            // overflow='hidden'
            style={{height: height * 0.4}}>
            <Image source={bgSUKA} style={{width, height}} />
          </View>
        </View>

        <Text style={styles.title}>Profile</Text>
        <LinearGradient
          colors={['#FAC353', '#FFA897']}
          style={styles.btnCircle_44}>
          <Bell size={24} weight="fill" color="#2C2F4A" />
        </LinearGradient>

        <View style={styles.box}>
          <TouchableOpacity style={styles.btnCircle_34} onPress={gotoEdit}>
            <PencilSimple size={18} weight="fill" color="#FFA897" />
          </TouchableOpacity>

          <View style={styles.circle}></View>

          <Image
            source={{uri: profile.profile_picture}}
            style={styles.profile}
          />

          <Text style={styles.name}>
            {profile.firstname} {profile.lastname}
          </Text>
          <View>
            <Text style={styles.phoneNum}>{profile.phone}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnRectangle}>
          <View style={styles.itemLeft}>
            <View style={styles.bgIconMyToilet}>
              <Toilet size={22} weight="fill" color="#2C2F4A" />
            </View>

            <Text style={styles.textBody}>My Toilet</Text>
          </View>
          <CaretRight size={22} weight="bold" color="#2C2F4A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRectangle_2}>
          <View style={styles.itemLeft}>
            <View style={styles.bgIconHistory}>
              <ClockCounterClockwise size={22} weight="fill" color="#2C2F4A" />
            </View>

            <Text style={styles.textBody}>History</Text>
          </View>
          <CaretRight size={22} weight="bold" color="#2C2F4A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRectangle_2} onPress={handleLogout}>
          <View style={styles.itemLeft}>
            <View style={styles.bgIconLogout}>
              <SignOut size={22} weight="fill" color="#2C2F4A" />
            </View>

            <Text style={styles.textBody}>Logout</Text>
          </View>
          <CaretRight size={22} weight="bold" color="#2C2F4A" />
        </TouchableOpacity>
      </SafeAreaView>
      <View
        style={{height: height * 0.1, backgroundColor: '#E5EAFA'}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EAFA',
    paddingHorizontal: 16,
  },

  // Header
  title: {
    position: 'absolute',
    top: 40,
    left: 16,
    fontFamily: 'Fredoka-Medium',
    fontSize: 32,
    color: '#F4F6FD',
  },
  btnCircle_44: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 30,
    top: 37,
    right: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profile
  box: {
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
    height: 199,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 4,
  },
  name: {
    alignSelf: 'center',
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 24,
    color: '#2C2F4A',
    paddingTop: 26,
    paddingBottom: 20,
  },
  phoneNum: {
    alignSelf: 'center',
    fontFamily: 'Fredoka-Regular',
    fontSize: 16,
    color: '#777790',
    paddingBottom: 5,
  },
  email: {
    alignSelf: 'center',
    fontFamily: 'Fredoka-Regular',
    fontSize: 16,
    color: '#777790',
  },
  circle: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: -60,
    backgroundColor: '#FFFFFF',
  },
  profile: {
    alignSelf: 'center',
    width: 104,
    height: 104,
    borderRadius: 100,
    marginTop: -112,
  },
  btnCircle_34: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 20,
    top: 18,
    right: 122,
    backgroundColor: '#2C2F4A',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  // Footer
  btnRectangle: {
    marginTop: 35,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bgIconMyToilet: {
    backgroundColor: '#9CA7E5',
    width: 38,
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textBody: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 16,
    color: '#2C2F4A',
  },

  btnRectangle_2: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgIconHistory: {
    backgroundColor: '#FFB5A6',
    width: 38,
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bgIconLogout: {
    backgroundColor: '#FC8066',
    width: 38,
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default Profile;
