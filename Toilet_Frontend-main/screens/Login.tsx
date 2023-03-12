import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LogoSUKA from '../assets/LogoSUKA.png';
import bgSUKA_5 from '../assets/bgSUKA_5.png';
import {
  CaretLeft,
  CaretRight,
  EnvelopeSimple,
  Key,
} from 'phosphor-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../components/colors';
import {TextInput} from 'react-native-paper';
import {signIn} from '../services/auth';
import AuthContext from '../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import OutlineInput from 'react-native-outline-input';

const {width} = Dimensions.get('window');
const aspectRatio = 500 / 500;
const height = width * aspectRatio;

function Login({navigation}: {navigation: any}) {
  const [email, setEmail] = useState('aom08@gmail.com');
  const [password, setPassword] = useState('0008');
  const {setLoggedIn} = useContext(AuthContext);
  const [errorsEmail, setErrorsEmail] = useState('');
  const [errorsPassword, setErrorsPassword] = useState('');
  const hardleLogin = async () => {
    try {
      const res: any = await signIn({
        email: email,
        password: password,
      });
      console.log('res token', res);
      if (res.message === 'success') {
        AsyncStorage.setItem('token', res.token);
        setLoggedIn(true);
        console.log('token kkkkkkkkkk');
        navigation.replace('MainStack', {screen: 'Home'});
      }
    } catch (err: any) {
      setErrorsEmail('');
      setErrorsPassword('');
      err.errors.map((item: any) => {
        if (item.param === 'email') {
          setErrorsEmail(item.msg);
        } else if (item.param === 'password') {
          setErrorsPassword(item.msg);
        }
      });
    }
  };

  // const [text, setText] = React.useState('');
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{alignItems: 'center'}}>
        <View
          // borderBottomLeftRadius={60}
          // overflow='hidden'
          style={{height: height * 0.4}}>
          <Image source={bgSUKA_5} style={{width, height}} />
        </View>
      </View>

      <Text style={styles.title}>Sign In</Text>
      {/* <View style={{alignItems: 'center'}}>
        <Image source={LogoSUKA} style={styles.logo} />
      </View> */}
      <View style={{height: height * 0.4}}></View>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <View style={{paddingBottom: 12}}>
            <TextInput
              label="Email"
              value={email}
              theme={theme}
              style={styles.bgTextInput}
              mode="outlined"
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.error}>{errorsEmail}</Text>
          </View>

          <View>
            <TextInput
              label="Password"
              value={password}
              theme={theme}
              style={styles.bgTextInput}
              mode="outlined"
              secureTextEntry
              // right={<TextInput.Icon icon="eye" />}
              onChangeText={text => setPassword(text)}
            />
            <Text style={styles.error}>{errorsPassword}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnSignIn} onPress={hardleLogin}>
          <Text style={styles.textSignIn}>SIGN IN</Text>
        </TouchableOpacity>

        <Text style={styles.textBody}>
          New User?
          <Text
            style={styles.textButton}
            onPress={() => navigation.navigate('SignUp')}>
            {' '}
            SIGN UP
          </Text>
        </Text>

      </View>
    </KeyboardAwareScrollView>
  );
}

const theme = {
  colors: {
    primary: '#6D7DD3',
  },
  fonts: {
    regular: {
      fontFamily: 'Fredoka-Regular',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FD',
  },
  // logo: {
  //   marginBottom: 30,
  //   marginTop: -2,
  //   width: 150,
  //   height: 180,
  // },
  title: {
    position: 'absolute',
    top: 40,
    left: '28%',
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 64,
    color: '#2C2F4A',
  },

  mainContainer: {
    backgroundColor: '#F4F6FD',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 25,
    paddingVertical: 35,
    elevation: 10,
  },

  textInput: {
    color: '#F4F6FD',
  },
  bgTextInput: {
    backgroundColor: '#F4F6FD',
    fontFamily: 'Fredoka-Regular',
  },

  btnSignIn: {
    backgroundColor: '#6D7DD3',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '100%',
    paddingHorizontal: 25,
    marginVertical: 25,
    borderRadius: 8,
    elevation: 2,
  },
  textSignIn: {
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 16,
    color: '#F4F6FD',
  },

  textBody: {
    textAlign: 'center',
    fontFamily: 'Fredoka-Regular',
    fontSize: 16,
    color: '#2C2F4A',
  },
  textButton: {
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 16,
    color: '#6D7DD3',
  },

  error: {
    color: '#D75D5D',
    fontFamily: 'Fredoka-Medium',
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: 16,
  },
});
export default Login;
