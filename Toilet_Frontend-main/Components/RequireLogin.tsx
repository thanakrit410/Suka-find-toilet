import {View, Text, TouchableHighlight} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../stacks/RootStack';
import LogoutProfile from '../screens/LogoutProfile';

interface IProps {
  children: JSX.Element;
}

const RequireLogin = (props: IProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();

  const {isLoggedIn} = useContext(AuthContext);

  useEffect(() => {}, [isLoggedIn]);

  // user is not loggedIn
  if (isLoggedIn === false) {
    return (
      <View style={{flex: 1}}>
        {/* <TouchableHighlight
          onPress={() => navigation.navigate('AuthStack', {screen: 'Login'})}>
          <Text>go to Login</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>go to SignUp</Text>
        </TouchableHighlight> */}
        <LogoutProfile></LogoutProfile>
      </View>
    );
  }

  return props.children;
};

export default RequireLogin;
