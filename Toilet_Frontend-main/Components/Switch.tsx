import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect} from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import AddDetailToilet2 from '../screens/AddDetailToilet 2';
import {type} from 'os';
import handicapContext from '../context/handicapContext';

// export type IhandicapContext = {
//   sendhandicap: boolean;
//   setSendhandicap: (value: boolean) => void;
// };

// export const [sendvalue, setSendvalue] = useState(false);
// export interface Iaom {
//   sendvalue: boolean;
// }
interface ISwitch {
  activeColor: any;
  inActiveColor: any;
  active: boolean;
  onPress: () => void;
}
const Switch = ({activeColor, inActiveColor, active, onPress}: ISwitch) => {
  const switchTranslate = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });
  useEffect(() => {
    console.log(active);
    if (active) {
      switchTranslate.value = 22;
      console.log('true');
    } else {
      switchTranslate.value = 4;
      console.log('false');
    }
  }, [active]);

  // const handicapState: IhandicapContext = {
  //   sendhandicap: sendvalue === true ? true : false,
  //   setSendhandicap(value) {},
  // };

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor],
    );
    return {
      backgroundColor,
    };
  });
  // const handicapState: IhandicapContext = {
  //   sendhandicap: sendvalue === true  ? true : false,
  //   setSendhandicap(value) {},
  // };

  // const handicapContext = React.createContext<IhandicapContext>(handicapState);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
// export const aom = sendvalue;
export default Switch;

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 22,
    backgroundColor: '#BABCCA',
    borderRadius: 30,
    justifyContent: 'center',
  },
  circle: {
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
