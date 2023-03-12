import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export type AuthTabParamList = {
  Login: undefined;
  SignUp: undefined;
  // AddToilet: undefined;
  // Cartoon: undefined;
  // AddList: undefined;
};
const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthTabParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
