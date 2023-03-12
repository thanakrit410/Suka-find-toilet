import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import React, {useReducer, useRef} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {
  MapTrifold,
  Heart,
  Plus,
  SquaresFour,
  User,
} from 'phosphor-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  color,
} from 'react-native-reanimated';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import AddToilet from '../screens/AddToilet';
import Cartoon from '../screens/Cartoon';
import AddList from '../screens/AddList';
import Login from '../screens/Login';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import ProfileStack, {ProfileParamList} from './ProfileStack';
import AddToiletStack, {AddToiletParamList} from './AddToiletStack';
import {RootStackList} from './RootStack';

import HomeStack, {HomeParamList} from './HomeStack';
export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeParamList>;
  MyList: undefined;

  AddToiletStack: NavigatorScreenParams<AddToiletParamList>;
  Cartoon: undefined;
  ProfileStack: NavigatorScreenParams<ProfileParamList>;
};
export type NaviTabParamList = {
  Login: undefined;
};
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BottomTabStack = () => {
  const Stack = createBottomTabNavigator<BottomTabParamList>();
  const Stack2 = createBottomTabNavigator<RootStackList>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackList>>();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          // tabBarActiveTintColor: '#FFA897',
          // tabBarInactiveTintColor: '#BABCCA',
          tabBarStyle: {
            backgroundColor: '#2C2F4A',
          },
        }}>
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MapTrifold
                color={focused ? '#FFA897' : '#BABCCA'}
                size={24}
                weight="fill"
              />
            ),
          }}
        />
        <Stack.Screen
          name="MyList"
          component={AddList}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Heart
                color={focused ? '#FFA897' : '#BABCCA'}
                size={24}
                weight="fill"
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddToiletStack"
          component={AddToiletStack}
          // onPress={() =>
          //   navigation.navigate('AddToiletStack', {screen: 'AddToilet'})
          // }
          options={{
            tabBarStyle: {display: 'none'},
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused, color, size}) => (
              <Plus
                color={focused ? '#FFA897' : '#BABCCA'}
                size={24}
                weight="fill"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Cartoon"
          component={Cartoon}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <SquaresFour
                color={focused ? '#FFA897' : '#BABCCA'}
                size={24}
                weight="fill"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <User
                color={focused ? '#FFA897' : '#BABCCA'}
                size={24}
                weight="fill"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

// const PlaceholderScreen = () => {
//   return <View style={{flex: 1, backgroundColor: '#E5EAFA'}} />;
// };

// const AnimatedTabBar = ({
//   state: {index: activeIndex, routes},
//   navigation,
//   descriptors,
// }: BottomTabBarProps) => {
//   const {bottom} = useSafeAreaInsets();

//   const reducer = (state: any, action: {x: number; index: number}) => {
//     return [...state, {x: action.x, index: action.index}];
//   };

//   const [layout, dispatch] = useReducer(reducer, []);
//   // console.log(layout);

//   const handleLayout = (event: LayoutChangeEvent, index: number) => {
//     dispatch({x: event.nativeEvent.layout.x, index});
//   };

//   const xOffset = useDerivedValue(() => {
//     if (layout.length !== routes.length) return 0;
//     return [...layout].find(({index}) => index === activeIndex)!.x - 25;
//   }, [activeIndex, layout]);

//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
//     };
//   });

//   return (
//     <View style={[styles.tabBar, {paddingBottom: bottom}]}>
//       <AnimatedSvg
//         width={110}
//         height={58}
//         viewBox="0 0 110 60"
//         style={[styles.activeBackground, animatedStyles]}
//         fill="none"
//         // {...props}
//       >
//         <Path
//           fill="#E5EAFA"
//           d="M20 0H0c11.046 0 20 8.954 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.046 8.954-20 20-20H20z"
//         />
//       </AnimatedSvg>

//       <View style={styles.tabBarContainer}>
//         {routes.map((route, index) => {
//           const active = index === activeIndex;
//           const {options} = descriptors[route.key];

//           return (
//             <TabBarComponent
//               key={route.key}
//               active={active}
//               options={options}
//               onLayout={e => handleLayout(e, index)}
//               onPress={() => navigation.navigate(route.name)}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// type TabBarComponentProps = {
//   active?: boolean;
//   options: BottomTabNavigationOptions;
//   onLayout: (e: LayoutChangeEvent) => void;
//   onPress: () => void;
// };

// const TabBarComponent = ({
//   active,
//   options,
//   onLayout,
//   onPress,
// }: TabBarComponentProps) => {
//   const ref = useRef(null);
//   const animatedComponentCircleStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: withTiming(active ? 1 : 0, {duration: 250}),
//         },
//       ],
//     };
//   });

//   const animatedIconContainerStyles = useAnimatedStyle(() => {
//     return {
//       opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
//     };
//   });

//   return (
//     <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
//       <Animated.View
//         style={[styles.componentCircle, animatedComponentCircleStyles]}
//       />
//       <Animated.View
//         style={[styles.iconContainer, animatedIconContainerStyles]}>
//         {options.tabBarIcon ? (
//           options.tabBarIcon({
//             focused: false,
//             color: '',
//             size: 0,
//           })
//         ) : (
//           <Text>?</Text>
//         )}
//       </Animated.View>
//     </Pressable>
//   );
// };

export default BottomTabStack;

const styles = StyleSheet.create({
  // tabBar: {
  //   backgroundColor: '#2C2F4A',
  // },
  // activeBackground: {
  //   position: 'absolute',
  // },
  // tabBarContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  // },
  // component: {
  //   height: 65,
  //   width: 60,
  //   marginTop: -5,
  // },
  // componentCircle: {
  //   flex: 1,
  //   borderRadius: 30,
  //   marginBottom: 5,
  //   backgroundColor: '#2C2F4A',
  // },
  // iconContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
