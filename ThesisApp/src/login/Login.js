import React, { useContext, useRef, useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet, Alert, Button, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from './style';
import styles from '../styles/styles'
import { authApi, endpoints } from '../configs/Apis';
import { MyUserContext } from '../../App';
import ToastifyMessage from '../component/layout/ToastifyMessage';
import color from '../assets/js/color';
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [current_user, dispatch] = useContext(MyUserContext);
    const [show, setShow] = useState(false)
    const toastRef = useRef(null);
    const loginUser = async () => {
        // Tạo form data để gửi trong yêu cầu
        const formData = new FormData();
        formData.append('username', username.toLowerCase());
        formData.append('password', password);
        try {
            if (!username || !password) {
                setError('Tên đăng nhập và mật khẩu không được trống');
                setShow(true)
                console.log('Tài khoản không hợp lệ');
                // setTimeout(() => {
                //     setShow(false)
                // }, 2000)
                console.log(show)
                return;
            }
            else {
                setLoading(true)
                let response = await axios.post(endpoints['login'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // lưu vào AsyncStorage
                await AsyncStorage.setItem('token', response.data.access_token);
                let { data } = await axios.get(endpoints['current-user'], {
                    headers: {
                        'Authorization': "Bearer " + response.data.access_token,
                    },
                });
                console.log('Đăng nhập thành công');
                navigation.navigate('ThesisApp');
                // lưu thông tin user đăng nhập
                await AsyncStorage.setItem('user', JSON.stringify(data));
                dispatch({
                    "type": "login",
                    "payload": data.data
                });
                setLoading(false)
            }

        } catch (error) {
            console.log('Lỗi:', error);
            setError('Tên đăng nhập hoặc mật khẩu sai');
            setShow(true)
            setLoading(false)
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const showPass = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        // console.log('trạng thái 77777:', show)
        if (show === true) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
        // console.log(show)
    }, [show]);

    return (
        <View>
            <View style={[login.top, { backgroundColor: color.green }]}>
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

            <KeyboardAvoidingView style={[login.bottom]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={500}
            >
                <View style={login.text_input}>
                    <Text style={[login.text]}>Tên đăng nhập</Text>
                    <View style={[login.input, { flexDirection: 'row', alignItems: 'center' }]}>
                        <FontAwesome style={{ width: '15%' }} name='user' size={20} color={color.green} />
                        <TextInput
                            style={{ width: '90%' }}
                            placeholder='Tên đăng nhập'
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </View>
                </View>
                <View style={login.text_input}>
                    <Text style={login.text}>Mật khẩu</Text>
                    <View style={[login.input, { flexDirection: 'row', alignItems: 'center' }]}>
                        <TouchableOpacity onPress={showPass} style={{ width: '15%' }}>
                            <Entypo name={showPassword ? 'lock-open' : 'lock'} size={20} color={color.green} />
                        </TouchableOpacity>
                        <TextInput
                            style={{ width: '90%' }}
                            placeholder='Mật khẩu'
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={text => setPassword(text)}

                        />


                    </View>

                </View>
                {loading === true ? <><ActivityIndicator size={25} color={color.green} /></> : <>
                    <View style={login.text_input}>
                        <TouchableOpacity onPress={() => { loginUser() }}>
                            <Text style={login.button}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>

                    </View>
                </>}


                <View style={[login.text_input, login.link]}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Quên mật khẩu") }}>
                        <Text style={[login.text, login.text_link]}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
            {show === true && (
                <ToastifyMessage
                    type="danger"
                    text={error}
                    description="Đăng nhập thất bại"
                />
            )}

        </View>


    )
}
export default Login