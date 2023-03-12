import React, {useReducer, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
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
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import LogoutProfile from '../screens/LogoutProfile';
import UpdateProfile from '../screens/UpdateProfile';

const Tab = createBottomTabNavigator();
const profile = 'Profile';
const homeScreen = 'HomeScreen';
const login = 'Login';
const signUp = 'SignUp';
const logoutProfile = 'LogoutProfile';
const updateProfile = 'UpdateProfile';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function Tabbars() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{tabBarHideOnKeyboard: true}}
          tabBar={props => <AnimatedTabBar {...props} />}>
          <Tab.Screen
            name={homeScreen}
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <MapTrifold color="#FFA897" size={28} weight="fill" />
              ),
            }}
          />
          <Tab.Screen
            name={logoutProfile}
            component={LogoutProfile}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Heart color="#FFA897" size={28} weight="fill" />
              ),
            }}
          />
          <Tab.Screen
            name={login}
            component={Login}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Plus color="#FFA897" size={28} weight="fill" />
              ),
            }}
          />
          <Tab.Screen
            name={updateProfile}
            component={UpdateProfile}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <SquaresFour color="#FFA897" size={28} weight="fill" />
              ),
            }}
          />
          <Tab.Screen
            name={profile}
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <User color="#FFA897" size={28} weight="fill" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const PlaceholderScreen = () => {
  return <View style={{flex: 1, backgroundColor: '#E5EAFA'}} />;
};

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  const reducer = (state: any, action: {x: number; index: number}) => {
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({index}) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View style={[styles.tabBar, {paddingBottom: bottom}]}>
      <AnimatedSvg
        width={110}
        height={58}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
        // fill="none"
        // {...props}
      >
        <Path
          fill="#E5EAFA"
          d="M20 0H0c11.046 0 20 8.954 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.046 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options} = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({
  active,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) => {
  const ref = useRef(null);
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {options.tabBarIcon ? (
          options.tabBarIcon({
            focused: false,
            color: '',
            size: 0,
          })
        ) : (
          <Text>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2C2F4A',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 65,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    marginBottom: 5,
    backgroundColor: '#2C2F4A',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tabbars;
