import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import login from '../../login/style';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const ChangePassword = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [old_password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [check, setCheck] = useState('')
    const checkPassword = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData();
        formData.append('old_password', old_password);
        formData.append('user_id', current_user.id);
        console.log('form data', formData)
        // nhập mật khẩu không khớp thì xuất lỗi 400
        try {
            if (!old_password) {
                console.log('Nhập mật khẩu hiện tại');
                return;
            }

            const response = await authApiToken(token).post(endpoints["check-old-password"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log('====================', response.data)
            const json = await response.data
            // const jsonResponse = await response.json();

            // if (json === 'true') {
            //     console.log("Mật khẩu cũ hợp lệ", data)
            //     return true
            //     // setCheck(true)
            // }
            // else {
            //     // setCheck(false)
            //     console.log("Mật khẩu cũ không hợp lệ")
            //     return false
            // }
        } catch (error) {
            console.log('Lỗi:', error);
        }
    };

    const updatePassword = async () => {
        const token = await AsyncStorage.getItem('token')
        await checkPassword();
        console.log('mật khẩu cũ-------------', check)
        if (check !== true) {
            console.log("mật khẩu cũ không hợp lệ")
            return;
        }
        try {
            if (!old_password || !newPassword || !confirmNewPassword) {
                console.log('Vui lòng nhập đầy đủ thông tin');
                return;
            }

            if (newPassword !== confirmNewPassword) {
                console.log('Mật khẩu mới không khớp');
                return;
            }
            const form = new FormData();
            form.append('password', newPassword);
            console.log(form)
            const response = await authApiToken(token).patch(endpoints["update-user"](current_user.id), form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log('Cập nhật thành công:');
            alert("Đăng nhập lại sau 3s")
            setTimeout(() => {
                navigation.navigate("Login");
            }, 3000); // Thời gian chờ 3 giây 
        } catch (error) {
            console.log('Lỗi khi thay đổi mật khẩu:', error);
        }
    };

    useEffect(() => {
        // checkPassword()
        // handleChangePassword()
    }, [])
    return (
        <View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Mật khẩu cũ</Text>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={login.input}
                        placeholder='Nhập mật khẩu cũ'
                        value={old_password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={checkPassword}>
                        <AntDesign name='right' size={30} />

                    </TouchableOpacity>
                </View>

            </View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Mật khẩu mới</Text>
                <TextInput
                    style={login.input}
                    placeholder='Nhập mật khẩu mới'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                />
            </View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Nhập lại mật khẩu mới</Text>
                <TextInput
                    style={login.input}
                    placeholder='Nhập lại mật khẩu mới'
                    value={confirmNewPassword}
                    onChangeText={text => setConfirmNewPassword(text)}
                />
            </View>
            <View style={login.text_input}>
                <TouchableOpacity onPress={updatePassword}>
                    <Text style={login.button} >THAY ĐỔI</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword;