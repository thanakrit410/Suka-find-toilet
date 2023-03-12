import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddToiletParamList} from '../stacks/AddToiletStack';

const AddT2 = () => {
  const {params} = useRoute<RouteProp<AddToiletParamList, 'AddT2'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AddToiletParamList>>();
  return (
    <View>
      <Text>{params._id}</Text>
      <Text>{params.latitude}</Text>
      <Text>{params.longitude}</Text>
      <Button title="Submit" onPress={navigation.goBack} />
    </View>
  );
};

export default AddT2;

const styles = StyleSheet.create({});
