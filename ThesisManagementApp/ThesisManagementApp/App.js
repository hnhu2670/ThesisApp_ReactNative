import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/component/home/Home';
import Login from './src/login/Login';
import BottomTab from './src/layout/BottomTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './src/layout/Main';
import { AuthContext } from './src/context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import Services from './src/context/Services';
import HomeNavigation from './src/navigation/HomeNavigation';
function App() {
  const [userData, setUserData] = useState()
  useEffect(() => {
    Services.getUserAuth().then(resp => {
      console.log(resp);
      if (resp) {
        setUserData(resp)
      }
      else {
        setUserData(null)
      }
    })
  }, [])
  return (
    <AuthContext.Provider
      value={{ userData, setUserData }}>
      {userData ?
        <NavigationContainer>
          <HomeNavigation />
        </NavigationContainer>
        : <Login />}

    </AuthContext.Provider>
  );
}

export default App;