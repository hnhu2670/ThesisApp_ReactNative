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
import Profile from './src/component/user/Profile';
import ChangePassword from './src/component/user/ChangePassword';
import Update from './src/component/user/Update';
import DetailCom from './src/component/committee/DetailCom';
import ListCom from './src/component/committee/ListCom';
import AddCom from './src/component/committee/AddCom';
import Criteria from './src/component/criteria/Criteria';
import ForgetPassword from './src/component/user/ForgetPassword';

export const MyUserContext = createContext();
export const MyThesisContext = createContext();
const Stack = createNativeStackNavigator();
function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)
  const [data, setData] = useReducer()
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <MyThesisContext.Provider value={[data, setData]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='ThesiApp' component={Main} options={{ headerShown: true }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Cập nhật thông tin' component={Update} />
            <Stack.Screen name='Đổi mật khẩu' component={ChangePassword} />
            <Stack.Screen name='Chi tiết' component={DetailCom} />
            <Stack.Screen name='Danh sách hội đồng' component={ListCom} />
            <Stack.Screen name='Thêm hội đồng' component={AddCom} />
            <Stack.Screen name='Quên mật khẩu' component={ForgetPassword} />
            {/* <Stack.Screen name='Hoi dong' component={Criteria} /> */}

          </Stack.Navigator>
        </NavigationContainer>
      </MyThesisContext.Provider>
    </MyUserContext.Provider>
  )
}

export default App;