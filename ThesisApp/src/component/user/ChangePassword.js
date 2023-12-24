import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import login from '../../login/style';
import { authApi, endpoints } from '../../configs/Apis';

const ChangePassword = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const [password, setPassword] = useState('');
    const [taiKhoan, setTaiKhoanState] = useState({
        "newPassword": "",
        "confirmNewPassword": "",
    })

    const getPassword = async () => {
        const formData = new FormData();
        formData.append('password', password);
        console.log("Mật khẩu nè: ", formData)
        try {
            if (!password) {
                console.log('Chưa nhập mật khẩu');
                return;
            }

            let response = await authApi().post(endpoints['login'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Tài khoản: ", response.data)
        } catch (error) {
            console.log("Lỗi chỗ này: ", error)
        }
    }
    const change = (value, field) => {
        // setMyUser(user => ({
        //     ...user,
        //     [field]: value.trim()
        // }));
    };

    useEffect(() => {
        getPassword()
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
                    value={taiKhoan.newPassword}
                />
            </View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Nhập lại mật khẩu mới</Text>
                <TextInput
                    style={login.input}
                    placeholder='Nhập lại mật khẩu mới'
                    value={taiKhoan.confirmNewPassword}
                />
            </View>
            <View style={login.text_input}>
                <TouchableOpacity>
                    <Text style={login.button}
                    >THAY ĐỔI</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ChangePassword