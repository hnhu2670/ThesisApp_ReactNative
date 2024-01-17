import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import login from '../../login/style';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import ToastifyMessage from '../layout/ToastifyMessage';
import styles from '../../assets/js/style';
import profile from './style';
import color from '../../assets/js/color';

const ChangePassword = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [old_password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [show, setShow] = useState('')
    const [err, setErr] = useState('')


    const checkPassword = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData();
        formData.append('old_password', old_password);
        formData.append('user_id', current_user.id);
        console.log('form data', formData)
        try {
            if (!old_password) {
                console.log('Nhập mật khẩu hiện tại');
                return false;
            }

            const response = await authApiToken(token).post(endpoints["check-old-password"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            const json = await response.data
            console.log('====================', response.status)

            if (response.status == 200) {
                console.log("Mật khẩu cũ hợp lệ", json)
                return true
            }
            else {
                console.log("Không hợp lệ", json)
            }
        } catch (error) {
            console.log('Lỗi:', error);
            return false;

        }
    };

    const updatePassword = async () => {
        const token = await AsyncStorage.getItem('token')
        const oldPass = await checkPassword()
        console.log('mật khẩu cũ-------------', oldPass)
        if (!old_password || !newPassword || !confirmNewPassword) {
            console.log('Vui lòng nhập đầy đủ thông tin');
            setShow('error')
            setErr('Vui lòng nhập đầy đủ thông tin')
            return;
        }
        if (oldPass !== true) {
            setShow('error')
            setErr('Mật khẩu hiện tại không hợp lệ')
            return
        }
        try {


            if (newPassword !== confirmNewPassword) {

                console.log('Mật khẩu mới không khớp');
                setShow('error')
                setErr('Mật khẩu mới không khớp')
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
            // alert("Đăng nhập lại sau 3s")
            setShow('success')
            setErr('Đổi mật khẩu thành công')
            setTimeout(() => {
                navigation.navigate("Login");
            }, 3000); // Thời gian chờ 3 giây 
        } catch (error) {
            console.log('Lỗi khi thay đổi mật khẩu:', error);
        }

    };

    useEffect(() => {
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [show]);

    return (

        <View>

            <View style={[profile.topChange]}>
                <Text style={[profile.tile]}>Thay đổi mật khẩu</Text>
            </View>
            <KeyboardAvoidingView
                style={[profile.bottomChange]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={500}
            >
                <View style={login.text_input}>
                    <Text style={[login.text]}>Mật khẩu cũ</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Nhập mật khẩu cũ'
                        value={old_password}
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
                    <TouchableOpacity onPress={updatePassword}>
                        <Text style={login.button} >THAY ĐỔI</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {show === 'error' ? <>
                <ToastifyMessage
                    type="danger"
                    text={err}
                    description="Đổi mk thất bại"
                />
            </> : <>
                {show === 'success' && (
                    <ToastifyMessage
                        type="success"
                        text={err}
                        description="Đổi thành công thất bại"
                    />
                )}
            </>}
            {/* {show === 'error'? (
                <ToastifyMessage
                    type="danger"
                    text={err}
                    description="Đổi mk thất bại"
                />
            ):
            (

                    { show==='success'}
            )
            } */}
        </View>
    )
}

export default ChangePassword;