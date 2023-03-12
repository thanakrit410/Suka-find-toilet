import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StackSimple} from 'phosphor-react-native';
enum MapType {
  standard = 'standard',
  satellite = 'satellite',
  hybrid = 'hybrid',
  terrain = 'terrain',
}
const Buttonmap = () => {
  function Inactive() {
    console.log('calling the first function');
  }
  function Active() {
    console.log('calling the second function');
  }
  const [aom, setaom] = useState(true);
  const [currentType, setCurrentType] = useState(MapType.standard);
  function callBoth() {
    if (aom === true) {
      setCurrentType(MapType.standard);
      setaom(false);
    } else {
      setCurrentType(MapType.hybrid);
      setaom(true);
    }
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        // colors={['#FAC353', '#FFA897']}
        style={styles.btnStackSimple_44}
        onPress={callBoth}>
        <StackSimple size={24} weight="fill" color="#2C2F4A" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Buttonmap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnStackSimple_44: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F4F6FD',
    top: 35,
    left: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 8,
    resizeMode: 'contain',
    width: 412,
    height: 250,
    marginTop: 100,
  },
});
