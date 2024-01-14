import * as React from 'react';
import 'react-native-gesture-handler';
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
import ListCom from './src/component/committee/ListCom';
import AddCom from './src/component/committee/AddCom';
import AddThesis from './src/component/thesis/AddThesis';
import UpdateThesis from './src/component/thesis/UpdateThesis';
import ListThesis from './src/component/thesis/ListThesis';
import ForgotPassword from './src/component/user/ForgotPassword';
import UpdateComm from './src/component/committee/UpdateComm';
import AddScore from './src/component/score/AddScore';

export const MyUserContext = createContext();
export const MyThesisContext = createContext();
const Stack = createNativeStackNavigator();
function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='ThesisApp' component={Main}
            options={{
              title: 'ThesisApp',
              headerShown: false,
            }}
          />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Cập nhật thông tin' component={Update} />
          <Stack.Screen name='Đổi mật khẩu' component={ChangePassword} />
          <Stack.Screen name='Cập nhật hội đồng' component={UpdateComm} />
          <Stack.Screen name='Danh sách hội đồng' component={ListCom} />
          <Stack.Screen name='Thêm hội đồng' component={AddCom} />
          <Stack.Screen name='Quên mật khẩu' component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name='Thêm khóa luận' component={AddThesis} />
          <Stack.Screen name='Cập nhật khóa luận' component={UpdateThesis} />
          <Stack.Screen name='Danh sách khóa luận' component={ListThesis} />
          <Stack.Screen name='Chấm Điểm' component={AddScore} />
          {/* <Stack.Screen name='Hoi dong' component={Criteria} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </MyUserContext.Provider>
  )
}

export default App;