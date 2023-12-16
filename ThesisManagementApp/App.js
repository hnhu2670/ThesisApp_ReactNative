import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import MyUserReducer from './src/reducers/MyUserReducer';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/component/home/Home';
import Login from './src/login/Login';
import Main from './src/component/Main';

export const MyUserContext = createContext();

const Stack = createNativeStackNavigator();
function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyUserContext.Provider>
  )
}

export default App;