import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import login from '../../login/style'
import axios from 'axios'
import { endpoints } from '../../configs/Apis'

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState([])

    const sendEmail = async () => {
        const formData = new FormData()
        formData.append("email", email)
        console.log(formData)
        try {
            const response = await axios.post(endpoints["forgot-password"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("status", response.data.data)
            alert(response.data.data + "'Trở về trang login sau 3s'")
            setTimeout(() => {
                navigation.navigate("Login")
            }, 3000)

        } catch (error) {
            console.log("lỗi rồi nè,", error)
            alert("tài khoản không tồn tại")
        }
    }
    return (
        <View>
            <Text>ForgetPassword</Text>
            <View style={login.text_input}>
                <Text style={login.text}>Email </Text>
                <TextInput
                    style={login.input}
                    placeholder='Nhập email nhận mật khẩu mới'
                    // secureTextEntry
                    value={email}

                    // value={'123456'}
                    onChangeText={text => setEmail(text)}

                />
            </View>

            <View style={login.text_input}>
                <TouchableOpacity>
                    <Text style={login.button}
                        onPress={() => sendEmail()}
                    >GỬI YÊU CẦU</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default ForgetPassword