import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis';
import login from '../../login/style';

const DetailCom = ({ route }) => {
    const { id } = route.params;
    const [detai, setDetail] = useState([])
    const getDetail = async () => {
        try {
            const { data } = await axios.get(endpoints['edit-committes'](id))
            console.log("detail", data)
            setDetail(data)
        } catch (error) {
            console.log("lỗi nè", error)
        }
        const { data } = await axios.get(endpoints['edit-committes'](id))
        console.log("detail", data)
        setDetail(data)
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <View>
            <Text>{detai.name}</Text>
            <View style={login.bottom}>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Số lượng thành viên</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Số lượng thành viên trong hội đồng'
                    // value={username}
                    // onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Số lượng hội đồng đã tha</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Số lượng thành viên trong hội đồng'
                    // value={username}
                    // onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Số lượng thành viên</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Số lượng thành viên trong hội đồng'
                    // value={username}
                    // onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={login.text}>Chức vụ</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Chức vụ trong hội đồng'
                        secureTextEntry
                    // value={password}

                    // // value={'123456'}
                    // onChangeText={text => setPassword(text)}

                    />
                </View>

                <View style={login.text_input}>
                    <TouchableOpacity>
                        <Text style={login.button}
                        // onPress={() => loginUser()}
                        >ĐĂNG NHẬP</Text>
                    </TouchableOpacity>

                </View>


            </View>
        </View>
    )
}

export default DetailCom