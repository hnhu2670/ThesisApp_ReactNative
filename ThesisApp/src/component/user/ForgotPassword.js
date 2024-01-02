import React, { useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import login from '../../login/style'
import axios from 'axios'
import { endpoints } from '../../configs/Apis'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState([])

    const sendEmail = async () => {
        const formData = new FormData()
        formData.append("email", email)
        // console.log(formData)
        try {
            const response = await axios.post(endpoints["forgot-password"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log("status", response.data.data)
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
            <View style={forget.top}>
                <View >
                    <Image
                        style={forget.img}
                        source={{ uri: 'https://res.cloudinary.com/dhdca9ibd/image/upload/v1704125502/qsvhr2rmalbfsgeeaf9u.png' }} />
                </View>
                <Text style={{ fontFamily: "Dancing Script" }}>Thesis App</Text>
                <Text>Quên mật khẩu ??</Text>
            </View>
            <View style={forget.bottom}>
                <View style={login.text_input}>
                    <Text style={login.text}>Email </Text>
                    <TextInput
                        style={login.input}
                        placeholder='Nhập email nhận mật khẩu mới'
                        value={email}
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
                <View style={login.text_input}>
                    <TouchableOpacity>
                        <Text>Quay lại trang đăng nhập</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    )
}
const forget = StyleSheet.create({
    // image: {
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "light"
    // },
    // img: {
    //     width: "60%",
    //     height: "60%",
    //     paddingHorizontal: 30,
    //     paddingVertical: 30,
    //     // backgroundColor: "red"

    // },
    top: {
        height: '45%',
        backgroundColor: "lightblue"
    },
    bottom: {
        height: '50%'
    }
})
export default ForgotPassword