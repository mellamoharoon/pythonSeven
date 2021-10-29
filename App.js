import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Profile from './screens/Profile'
import Search from './screens/Search'
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Platform, InteractionManager } from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Search" component={Search} options={{ headerShown: false, tabBarActiveBackgroundColor: 'gray', tabBarIcon: () => <AntDesign name="search1" size={24} color="black" /> }} />
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarActiveBackgroundColor: 'gray', tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          headerShown: false, tabBarActiveBackgroundColor: 'gray', tabBarIcon: () => <FontAwesome5 name="user-alt" size={24} color="black" />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
