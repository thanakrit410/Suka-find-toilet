import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Platform,
  Alert,
} from 'react-native';
import bgSUKA from '../assets/bgSUKA_4.png';
import profile from '../assets/profile.jpg';
import {Check, Camera, X} from 'phosphor-react-native';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileParamList} from '../stacks/ProfileStack';
import {updateProfile} from '../services/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {fileToBase64} from '../utils/convert';

export interface IProfileEdit {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  profile_picture: string;
}

const {width} = Dimensions.get('window');
const aspectRatio = 500 / 500;
const height = width * aspectRatio;

function UpdateProfile() {
  const {params} = useRoute<RouteProp<ProfileParamList, 'UpdateProfile'>>();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profilePicture, setprofilePicture] = useState(
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sanook.com%2Fnews%2F&psig=AOvVaw2LozT_eZjCaKky5wHekfdr&ust=1675358692831000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPD1ltLr9PwCFQAAAAAdAAAAABAE',
  );
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileParamList>>();
  // console.log('props edit profile', params);
  const onSubmit = async () => {
    const body = {
      firstname: firstname,
      lastname: lastname,
      phone: phoneNum,
      profile_picture: profilePicture,
    };
    await updateProfile(params._id, body);
    navigation.replace('Profile');
  };
  const chooseImage = async () => {
    let options: any = {
      includeBase64: true,
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async (response: any) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const pic = await fileToBase64(response.assets);
        // console.log(pic);

        // const source: any = response.assets[0].uri;
        // const aom = await fileToBase64(source);
        // You can also display the image using data:
        const source: any =
          'data:image/jpeg;base64,' + response.assets[0].base64;
        console.log(source);
        // this.setState({
        //  filePath: response,
        //  fileData: response.data,
        //  fileUri: response.uri
        // });
        setprofilePicture(source);
        // console.log('data95', profilePicture);
      }
    });
  };

  useEffect(() => {
    setFirstname(params.firstname);
    setLastname(params.lastname);
    setPhoneNum(params.phone);
    setprofilePicture(params.profile_picture);
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.space}>
        <View style={{alignItems: 'center'}}>
          <View
            // borderBottomLeftRadius={60}
            // overflow='hidden'
            style={{height: height * 0.4}}>
            <Image source={bgSUKA} style={{width, height}} />
          </View>
        </View>

        <TouchableOpacity style={styles.btnX_44} onPress={navigation.goBack}>
          <X size={24} weight="fill" color="#D75D5D" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCheck_44} onPress={onSubmit}>
          <Check size={24} weight="fill" color="#31C596" />
        </TouchableOpacity>

        <View style={styles.box}>
          <TouchableOpacity style={styles.btnCircle_34} onPress={chooseImage}>
            <Camera size={18} weight="fill" color="#FFA897" />
          </TouchableOpacity>

          <View style={styles.circle}></View>

          <Image source={{uri: profilePicture}} style={styles.profile} />

          <View style={styles.textInputSmall}>
            <View>
              <TextInput
                label="Fristname"
                defaultValue={params.firstname}
                theme={theme}
                style={styles.bgTextInput}
                mode="outlined"
                onChangeText={text => setFirstname(text)}
              />
            </View>

            <View style={styles.textInputRight}>
              <TextInput
                label="Lastname"
                defaultValue={params.lastname}
                theme={theme}
                style={styles.bgTextInput}
                mode="outlined"
                onChangeText={text => setLastname(text)}
              />
            </View>
          </View>

          <View style={styles.textInput}>
            <View style={{paddingBottom: 20}}>
              <TextInput
                label="Phone number"
                defaultValue={params.phone}
                theme={theme}
                style={styles.bgTextInput}
                mode="outlined"
                onChangeText={text => setPhoneNum(text)}
              />
            </View>

            <View style={{paddingBottom: 20}}>
              <TextInput
                label="Email"
                defaultValue={params.email}
                theme={theme}
                style={styles.bgTextInput}
                mode="outlined"
                onChangeText={text => setprofilePicture(text)}
              />
            </View>

            <View style={{paddingBottom: 20}}>
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
            </View>

            <View>
              <TextInput
                label="Confirm Password"
                value={conPassword}
                theme={theme}
                style={styles.bgTextInput}
                mode="outlined"
                secureTextEntry
                // right={<TextInput.Icon icon="eye" />}
                onChangeText={text => setConPassword(text)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={{height: 20}} />
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
    backgroundColor: '#E5EAFA',
  },

  space: {
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
  btnCheck_44: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: '#F4F6FD',
    top: 35,
    right: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnX_44: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: '#F4F6FD',
    top: 35,
    left: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profile
  box: {
    marginTop: -50,
    alignSelf: 'center',
    width: '100%',
    height: 460,
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
  textInput: {
    color: '#F4F6FD',
    paddingLeft: 16,
    paddingRight: 16,
    top: -36,
  },
  textInputSmall: {
    color: '#F4F6FD',
    width: 182,
    paddingLeft: 16,
    paddingTop: 20,
  },
  textInputRight: {
    position: 'relative',
    top: -56,
    left: 181,
  },
  bgTextInput: {
    backgroundColor: '#F4F6FD',
    fontFamily: 'Fredoka-Regular',
  },
});

export default UpdateProfile;
