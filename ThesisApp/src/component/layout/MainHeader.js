import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { authApi, endpoints } from '../../configs/Apis';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const MainHeader = ({ navigation }) => {
    const [user, dispatch] = useContext(MyUserContext);
    const [userInfo, setUserInfo] = useState('');
    const getUser = async () => {
        console.log("user: ", user.data.id)
        try {
            let res = await axios.get(`http://192.168.1.11:8000/users/${user.data.id}`)
            setUserInfo(res.data)
            console.log(JSON.stringify(res.data));
        } catch (err) {
            console.log(err)
        }
    }
    const logout = () => {
        dispatch({
            "type": "logout"
        })
        navigation.navigate('Login')
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <View>
            <View >
                <Image source={{ uri: userInfo?.avatar }} />
                <Text>Hello, tôi là {user.data.last_name} !!!!!!</Text>
                <TouchableOpacity onPress={logout}>
                    <Text>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainHeader