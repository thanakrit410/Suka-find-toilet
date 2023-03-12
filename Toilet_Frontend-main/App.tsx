import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import './config/axiosconfig';
import BottomTabStack from './stacks/BottomTabStack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import RootStack from './stacks/RootStack';
import Buttonmap from './components/Buttonmap';
import AddDetailToilet2 from './screens/AddDetailToilet 2';
import DetailToilet from './screens/DetailToilet';
import Ratings from './screens/Ratings';
import Search from './screens/Search';
import Search2 from './screens/Search2';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    // <NavigationContainer>
    //   <Search />
    // </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({});
