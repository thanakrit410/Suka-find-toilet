import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import BottomTabStack, {BottomTabParamList} from './BottomTabStack';
import AuthStack, {AuthTabParamList} from './AuthStack';
import AuthContext from '../context/AuthContext';
import Login from '../screens/Login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileStack, {ProfileParamList} from './ProfileStack';
import AddToiletStack, {AddToiletParamList} from './AddToiletStack';

export type RootStackList = {
  AuthStack: NavigatorScreenParams<AuthTabParamList>;
  MainStack: NavigatorScreenParams<BottomTabParamList>;
  // AddToiletStack: NavigatorScreenParams<AddToiletParamList>;
};

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackList>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkTokenInStorage = async () => {
      await AsyncStorage.getItem('token').then(token => {
        console.log('token in storage', token);
        if (token) {
          // setIsLoggedIn(String(token).length > 0 ? true : false);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    };
    checkTokenInStorage();
  }, []);
  return (
    <AuthContext.Provider
      value={{isLoggedIn: isLoggedIn, setLoggedIn: setIsLoggedIn}}>
      <Stack.Navigator
        initialRouteName="MainStack"
        screenOptions={{
          headerShown: false,
          statusBarHidden: true,
        }}>
        {/* {isLoggedIn ? ( */}
        <Stack.Screen name="MainStack" component={BottomTabStack} />
        {/* ) : ( */}
        <Stack.Screen name="AuthStack" component={AuthStack} />
        {/* <Stack.Screen name="AddToiletStack" component={AddToiletStack} /> */}
        {/* <Stack.Screen name="ProfileStack" component={ProfileStack} /> */}
        {/* )} */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
