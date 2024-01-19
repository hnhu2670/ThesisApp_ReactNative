import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../../assets/js/style'
import Search from '../layout/Search'
import { AntDesign } from '@expo/vector-icons'
import color from '../../assets/js/color'
import axios from 'axios'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
const windowHeight = Dimensions.get('window').height;

const UpdateName = ({ route, navigation }) => {
    const { id, name } = route.params; //id truyền từ trang danh sách qua
    // console.log('tên hội đồng ở updateName', id, name)

    const [nameComm, setNameComm] = useState({
        'name': name
    })
    const updateName = async () => {
        const token = await AsyncStorage.getItem('token')

        const formData = new FormData()
        for (let field in nameComm) {
            formData.append(field, nameComm[field]);
            // console.log(nameComm[field])
        }
        try {
            const data = authApiToken(token).patch(endpoints['update-name-committes'](id), formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log('update tên thành công', (await data).data)
            navigation.navigate('Danh sách hội đồng')


        } catch (error) {
            console.log('lỗi nhe', error)
        }
    }
    const change = (value, field) => {
        setNameComm(e => ({
            ...e,
            [field]: value
        }));
    };


    return (
        <View style={[styles.container, { paddingTop: 0 }]}>

            <View style={changeName.item}>
                <TextInput style={changeName.text}
                    value={nameComm.name}
                    onChangeText={text => change(text, "name")} />

                <TouchableOpacity
                    onPress={updateName}
                    style={changeName.mainIcon}>
                    <AntDesign name='check' color={color.green} style={changeName.icon} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={{
                    color: 'black',
                    fontStyle: 'italic'
                }}>
                    Nhập tên hội đồng mà bạn muốn thay đổi thành !!</Text>
            </View>


        </View>
    )
}
const changeName = StyleSheet.create({
    item: {
        flexDirection: 'row',
        // backgroundColor: 'lightblue',
        marginVertical: windowHeight * 0.01,
        paddingVertical: windowHeight * 0.02,
        paddingHorizontal: 20,
        alignItems: 'center', justifyContent: 'space-around',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,

    },
    text: {
        width: '80%', fontSize: 17, color: color.green
    },
    mainIcon: {
        width: '15%',
        // padding: 10,
        marginHorizontal: '1%',
        // backgroundColor: color.green_gold,
    },
    icon: {
        textAlign: 'center',
        fontSize: 30
    }
})
export default UpdateName