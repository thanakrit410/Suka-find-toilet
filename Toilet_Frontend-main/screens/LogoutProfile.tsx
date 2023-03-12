import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import bgSUKA from '../assets/bgSUKA_4.png';
import user from '../assets/user.png';
import {RootStackList} from '../stacks/RootStack';

const {width} = Dimensions.get('window');
const aspectRatio = 500 / 500;
const height = width * aspectRatio;

function LogoutProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View
          // borderBottomLeftRadius={60}
          // overflow='hidden'
          style={{height: height * 0.4}}>
          <Image source={bgSUKA} style={{width, height}} />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.circle}></View>

        <Image source={user} style={styles.profile} />

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => navigation.navigate('AuthStack', {screen: 'Login'})}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Fredoka-SemiBold',
              fontSize: 16,
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => navigation.navigate('AuthStack', {screen: 'SignUp'})}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Fredoka-SemiBold',
              fontSize: 16,
            }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EAFA',
    paddingHorizontal: 16,
  },

  // Profile
  box: {
    marginTop: 35,
    alignSelf: 'center',
    width: '100%',
    height: 215,
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
  btnLogin: {
    backgroundColor: '#6D7DD3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    borderRadius: 8,
    elevation: 6,
  },
  btnSignUp: {
    backgroundColor: '#FFA897',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
    borderRadius: 8,
    elevation: 6,
  },
});

export default LogoutProfile;
