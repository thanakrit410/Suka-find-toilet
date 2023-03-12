import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import bgSUKA from '../assets/bgSUKA_4.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  CaretLeft,
  Plus,
  Wheelchair,
  Star,
  PencilSimple,
} from 'phosphor-react-native';
import CurrencyBtc from '../assets/CurrencyBaht.png';
import wc from '../assets/wc.png';
import Switch from '../components/Switch';

const {width} = Dimensions.get('window');
const aspectRatio = 380 / 500;
const height = width * aspectRatio;

const MyToilet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={{height: height * 0.4}}>
          <Image source={bgSUKA} style={{width, height}} />
        </View>
      </View>

      <TouchableOpacity style={styles.btnBack_44}>
        <CaretLeft size={24} weight="bold" color="#FFA897" />
      </TouchableOpacity>

      <Text style={styles.title}>My Toilet</Text>

      <TouchableOpacity style={styles.btnAdd_44}>
        <Plus size={24} weight="bold" color="#fff" />
      </TouchableOpacity>

      <View style={styles.Rectangle}>
        <View style={styles.itemLeft_1}>
          <View style={styles.tagFree}>
            <Image source={CurrencyBtc} style={styles.iconBaht} />
            <Text style={styles.textFree}>Free</Text>
          </View>

          <View style={styles.tagHandicap}>
            <Wheelchair size={10} color="#00845A" />
            <Text style={styles.textWheelchair}>Handicap access</Text>
          </View>

          <View style={styles.tagType}>
            <Image source={wc} style={styles.iconType} />
            <Text style={styles.textType}>Public</Text>
          </View>
        </View>

        <View style={styles.itemLeft_2}>
          <Text style={styles.placeName}>Place Name</Text>
          <Star size={10} weight="fill" color="#FBD17B" />
          <Text style={styles.textStar}>5</Text>
        </View>

        <View style={styles.itemLeft_3}>
          <Text style={styles.textSwitch}>OPEN</Text>
          <Text style={styles.textTime}>00.00 - 00.00</Text>
        </View>

        <LinearGradient
          colors={['#FAC353', '#FFA897']}
          style={styles.btnEdit_34}>
          <PencilSimple size={22} weight="bold" color="#2C2F4A" />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default MyToilet;

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
    left: 74,
    fontFamily: 'Fredoka-Medium',
    fontSize: 32,
    color: '#F4F6FD',
  },
  btnBack_44: {
    position: 'absolute',
    backgroundColor: '#2C2F4A',
    width: 44,
    height: 44,
    borderRadius: 30,
    top: 37,
    left: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd_44: {
    position: 'absolute',
    backgroundColor: '#6D7DD3',
    width: 44,
    height: 44,
    borderRadius: 30,
    top: 37,
    right: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Content
  Rectangle: {
    marginTop: 5,
    marginBottom: 20,
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

  // Line 1
  itemLeft_1: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagFree: {},
  iconBaht: {},
  textFree: {},
  tagHandicap: {},
  textWheelchair: {},
  tagType: {},
  iconType: {},
  textType: {},

  // Line 2
  itemLeft_2: {},
  placeName: {},
  textStar: {},

  // Line 3
  itemLeft_3: {},
  textSwitch: {},
  textTime: {},

  // itemRight
  btnEdit_34: {},
});
