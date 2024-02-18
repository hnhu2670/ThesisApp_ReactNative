import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import MyUserReducer from './src/reducers/MyUserReducer';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast';

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
import DanhSachHD from './src/component/committee/DanhSachHD';
import DanhSachKL from './src/component/thesis/DanhSachKL';
import UpdateName from './src/component/committee/UpdateName';
import DetailCom from './src/component/committee/DetailCom';
import DeleteMember from './src/component/committee/DeleteMember';
import MyCommittee from './src/component/committee/MyCommittee';
import LecturerThesis from './src/component/thesis/LecturerThesis';
import StudentThesis from './src/component/thesis/StudentThesis';
import DetailThesis from './src/component/thesis/DetailThesis';
import CloseCommittee from './src/component/committee/CloseCommittee';
import ListThesisForScore from './src/component/thesis/ListThesisForScore';
import TableScore from './src/component/score/TableScore';
import ScoreOfStudent from './src/component/score/ScoreOfStudent';
import Chat from './src/component/chat/Chat';
import CreateFile from './src/component/file_pdf/CreateFile';
import Pdf from './src/component/file_pdf/Pdf';

export const MyUserContext = createContext();
export const MyThesisContext = createContext();
const Stack = createNativeStackNavigator();
function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)

  return (
    <PopupRootProvider>
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
            <Stack.Screen name='Khóa hội đồng' component={CloseCommittee} />
            <Stack.Screen name='Danh sách HĐ' component={DanhSachHD}
              options={{
                title: 'Xem hội đồng',
              }} />
            <Stack.Screen name='Chi tiết hội đồng' component={DetailCom}
              options={{
                title: 'Xem thông tin hội đồng',
              }} />
            <Stack.Screen name='Hội đồng tham gia' component={MyCommittee} />
            <Stack.Screen name='Xóa thành viên' component={DeleteMember} />
            <Stack.Screen name='Thêm hội đồng' component={AddCom} />
            <Stack.Screen name='Tên hội đồng' component={UpdateName} />
            <Stack.Screen name='Quên mật khẩu' component={ForgotPassword} options={{ headerShown: false }} />

            <Stack.Screen name='Thêm khóa luận' component={AddThesis} />
            <Stack.Screen name='Cập nhật khóa luận' component={UpdateThesis} />
            <Stack.Screen name='Danh sách khóa luận' component={ListThesis} />
            <Stack.Screen name='Danh sách KL' component={DanhSachKL}
              options={{
                title: 'Xem khóa luận',
              }} />
            <Stack.Screen name='Khóa luận giảng viên' component={LecturerThesis}
              options={{
                title: 'Khóa luận tham gia',
              }}
            />
            <Stack.Screen name='Khóa luận sinh viên' component={StudentThesis}
              options={{
                title: 'Khóa luận tham gia',
              }}
            />
            <Stack.Screen name='Chi tiết khóa luận' component={DetailThesis}
              options={{
                title: 'Xem thông tin khóa luận',
                headerShown: false
              }} />
            <Stack.Screen name='Chấm điểm' component={AddScore} />
            <Stack.Screen name='Danh sách chấm điểm' component={ListThesisForScore} />
            <Stack.Screen name='Bảng điểm' component={TableScore} />
            <Stack.Screen name='Điểm của tôi' component={ScoreOfStudent} />

            <Stack.Screen name='Messager' component={Chat}
              options={{
                title: 'Chat',
                headerShown: true
              }}
            />
            <Stack.Screen name='Tạo file' component={Pdf} />
            <Stack.Screen name='Xuất file' component={CreateFile} />
          </Stack.Navigator>
        </NavigationContainer>

      </MyUserContext.Provider>
    </PopupRootProvider >
  )
}

export default App;