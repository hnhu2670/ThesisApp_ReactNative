import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import login from '../../login/style';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import axios from 'axios';

const ChangePassword = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const formData = new FormData();
    formData.append('password', password);
    formData.append('username', current_user.username);
    // console.log(formData)

    const checkPassword = async () => {
        try {
            if (!password) {
                // setError('Tên đăng nhập và tài khoản không được trống');
                console.log('Nhập mật khẩu hiện tại');
                return;
            }

            let response = await axios.post(endpoints['login'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('Tới đây', response.status);

        } catch (error) {
            console.log('Lỗi:', error);
        }
    };
    const handleChangePassword = async () => {
        try {
            if (!password || !newPassword || !confirmNewPassword) {
                console.log('Vui lòng nhập đầy đủ thông tin');
                return;
            }

            if (newPassword !== confirmNewPassword) {
                console.log('Mật khẩu mới không khớp');
                return;
            }

            const data = {
                password: password,
                newPassword: newPassword,
            };
            console.log(data)
            const response = await authApi().post(endpoints['changePassword'], data);
            console.log('Kết quả thay đổi mật khẩu:', response.data);
        } catch (error) {
            console.log('Lỗi khi thay đổi mật khẩu:', error);
        }
    };

    useEffect(() => {
        checkPassword()
        // handleChangePassword()
    }, [])
    return (
        <View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Mật khẩu cũ</Text>
                <TextInput
                    style={login.input}
                    placeholder='Nhập mật khẩu cũ'
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
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
                <TouchableOpacity onPress={handleChangePassword}>
                    <Text style={login.button}>THAY ĐỔI</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword;