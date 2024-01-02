import React, { useContext, useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native'
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from './style';
import styles from '../styles/styles'
import { authApi, endpoints } from '../configs/Apis';
import { MyUserContext } from '../../App';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, dispatch] = useContext(MyUserContext);

    const loginUser = async () => {
        // Tạo form data để gửi trong yêu cầu
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);



        try {
            if (!username || !password) {
                setError('Tên đăng nhập và tài khoản không được trống');
                console.log('Tài khoản không hợp lệ');
                return;
            }

            let response = await axios.post(endpoints['login'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('Tới đây', response.status);

            // lưu vào AsyncStorage
            await AsyncStorage.setItem('token', response.data.access_token);

            // console.log(formData)
            let { data } = await axios.get(endpoints['current-user'], {
                headers: {
                    'Authorization': "Bearer " + response.data.access_token,
                },
            });
            // lưu thông tin user đăng nhập
            await AsyncStorage.setItem('user', JSON.stringify(data));
            console.log(data.data.avatar)
            dispatch({
                "type": "login",
                "payload": data.data
            });
            if (response.status === 200) {
                console.log('Đăng nhập thành công');
                // console.log(data.data)
                navigation.navigate('ThesisApp');
                setUsername('');
                setPassword('');
            } else {
                console.log('Đăng nhập thất bại');
            }

        } catch (error) {
            console.log('Lỗi:', error);
        }
    };



    return (
        <View style={styles.background}>
            <View style={login.top}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={[login.image]}
                        source={{
                            uri: 'https://res.cloudinary.com/dhdca9ibd/image/upload/v1702646071/xwdntzkpcoogfkicpnwk.png',
                        }}
                    />
                    <Text
                        style={{ color: "#fff", fontSize: 20, marginLeft: -200, paddingTop: 70 }}
                    >Welcome</Text>
                </View>

                <Text
                    style={{ color: "#fff", fontSize: 45, marginTop: -150, marginLeft: 30 }}
                >Thesis App</Text>

            </View>
            <View style={login.bottom}>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Tên đăng nhập</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Tên đăng nhập'
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={login.text}>Mật khẩu</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Mật khẩu'
                        secureTextEntry
                        value={password}

                        // value={'123456'}
                        onChangeText={text => setPassword(text)}

                    />
                </View>

                <View style={login.text_input}>
                    <TouchableOpacity>
                        <Text style={login.button}
                            onPress={() => loginUser()}
                        >ĐĂNG NHẬP</Text>
                    </TouchableOpacity>

                </View>

                <View style={[login.text_input, login.link]}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Quên mật khẩu") }}>
                        <Text style={[login.text, login.text_link]}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>


    )
}
export default Login