import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import MyUserReducer from './src/reducers/MyUserReducer';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/login/Login';
import Main from './src/component/home/Main'
import Criteria from './src/component/criteria/Criteria';
import Profile from './src/component/user/Profile';
export const MyUserContext = createContext();

const Stack = createNativeStackNavigator();
function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='ThesiApp' component={Main} options={{ headerShown: true }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyUserContext.Provider>
  )
}

export default App;