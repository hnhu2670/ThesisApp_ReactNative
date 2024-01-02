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
        <View style={forget.container}>
            <View style={forget.top}>
                <View style={forget.image}>
                    <Image
                        style={forget.img}
                        source={{ uri: 'https://res.cloudinary.com/dhdca9ibd/image/upload/v1704124298/vd4jbc4sgxilkc9btchp.png' }} />
                </View>
                <Text style={forget.text}>Quên mật khẩu ??</Text>
                <Text style={forget.mini_text}>Nhập emali của bạn để nhận thông tin đăng nhập mới !!!</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text
                            style={{
                                color: 'red', fontSize: 15, marginLeft: -25, textAlign: 'center', textDecorationLine: 'underline', fontStyle: 'italic'
                            }}>
                            Quay lại trang đăng nhập
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    )
}
const forget = StyleSheet.create({
    container: {
        marginTop: '20%'
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: "#2d665f",
        borderRadius: 150,
        borderWidth: 2,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginHorizontal: "25%",
    },
    img: {
        width: 140,
        height: 120,
        // padding: 10,
        justifyContent: "center",
        // alignItems: "center"
    },
    text: {
        color: '#2d665f',
        textAlign: 'center',
        fontSize: 30
    },
    mini_text: {
        justifyContent: "center",
        width: '85%',
        marginTop: 10,
        marginLeft: '8%',
        color: '#2d665f',
        textAlign: 'center',
        fontSize: 12,

    },
    top: {
        justifyContent: 'center',
        height: "45%",
        width: "100%",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2d665f',
        borderStyle: 'dotted'
    },
    bottom: {
        height: '50%',
        marginTop: 10
    }
})
export default ForgotPassword