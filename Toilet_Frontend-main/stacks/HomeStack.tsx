import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from '../context/AuthContext';
import RequireLogin from '../components/RequireLogin';
import HomeScreen from '../screens/HomeScreen';
import DetailToilet from '../screens/DetailToilet';
import Ratings from '../screens/Ratings';
import Search from '../screens/Search';
import Search2 from '../screens/Search2';

export type HomeParamList = {
  HomeScreen: undefined;
  DetailToilet: {
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
  };
  Ratings: undefined;
  Search: undefined;
};
const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeParamList>();
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailToilet" component={DetailToilet} />
      <Stack.Screen name="Ratings" component={Ratings} />
      <Stack.Screen name="Search" component={Search2} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
