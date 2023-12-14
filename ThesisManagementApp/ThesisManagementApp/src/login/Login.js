import React, { useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet, Alert, Button } from 'react-native'
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from './style';
import styles from '../styles/styles'
import Services from '../context/Services';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const [token, setAccessToken] = useState('')
    const { userData, setUserData } = useContext(AuthContext)
    const loginUser = async () => {

        // let form = new FormData()
        const SERVER_URL = 'http://192.168.1.9:8000';
        const TOKEN_ENDPOINT = '/o/token/';

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
            const response = await fetch(`${SERVER_URL}${TOKEN_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
            console.log(formData)
            console.log('Tới đây', response.status);
            if (response.status === 200) {
                navigation.navigate('Home')
                const result = await response.json();

                //await AsyncStorage.setItem('loginToken', result.access_token);

                const accountResponse = await fetch('http://192.168.1.9:8000/get-user-by-token/', {
                    headers: {
                        Authorization: `Bearer ${result.access_token}`,
                    },
                });
                const user = await accountResponse.json();
                console.log(user)
                setUserData(user);
                await Services.setUserAuth(user);
            } else {
                console.log("Tài khoản không tồn tại")
            }
        } catch (error) {
            console.log('Lỗi:', error);
        }
    };

    // const loadCriteria = async () => {
    //     const res = await fetch('http://192.168.1.9:8000/criteria/', {
    //         method: 'GET',
    //     });

    //     if (res.status === 200) {
    //         const result = await res.json();
    //         setCriteria(result);
    //     } else {
    //         throw new Error(res.statusText);
    //     }
    // }
    // useEffect(() => {
    //     loadCriteria();
    // }, []);

    return (
        <View style={styles.background}>
            <View style={login.top}>
                <View style={{ flexDirection: "row" }}>
                    {/* <Image
                        style={[login.image]}
                        source={img} /> */}
                    <Text
                        style={{ color: "#fff", fontSize: 20, verticalAlign: "middle", marginLeft: -150 }}
                    >Welcome</Text>
                </View>

                <Text
                    style={{ color: "#fff", fontSize: 45, marginTop: -140, marginLeft: 30 }}
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
                        onChangeText={text => setPassword(text)}

                    />
                </View>

                <View style={login.text_input}>
                    <Text style={login.button}
                        onPress={() => loginUser()}
                    >ĐĂNG NHẬP</Text>
                    {/* <Button title="Đăng nhập" onPress={handleLogin} /> */}


                </View>

                <View style={[login.text_input, login.link]}>
                    <Text style={[login.text, login.text_link]}>Quên mật khẩu</Text>
                </View>


                {/* {criteria.length < 1 ? (
                    <Text>Chưa có dữ liệu</Text>
                ) : (
                    criteria.map(c => <Text key={c.id}>{c.name}</Text>)
                )} */}



                {/* {user ? <Text >{user.first_name} thành công</Text> : <Text>Lỗi</Text>} */}

            </View>

        </View>


    )
}
export default Login