import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { authApi, endpoints } from '../../configs/Apis';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import styles from '../../assets/js/style';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainHeader = ({ navigation }) => {
    const [user, dispatch] = useContext(MyUserContext);
    const [userInfo, setUserInfo] = useState('');
    const logout = () => {
        dispatch({
            "type": "logout"
        })
        navigation.navigate('Login')
    }

    const goToProfile = () => {
        navigation.navigate('Profile');
    };
    // useEffect(() => {
    //     getUser();
    // }, [])
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={header.container}>
                <View>
                    <Image
                        style={header.avatar}
                        source={{ uri: userInfo?.avatar }} />
                </View>
                <View >
                    <Text style={header.text}>Hello, {user.data.first_name} {user.data.last_name} !!!!!!</Text>
                    <Text style={header.text}>{user.data.role}</Text>
                </View>



                {/* <TouchableOpacity onPress={logout}>
                    <Text>Đăng xuất</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{ marginLeft: 10, justifyContent: "center" }}>
                <Icon
                    onPress={goToProfile}
                    name="bars" size={25} style={{ paddingLeft: 20, paddingRight: 10 }} />
            </View>
        </View>

    )
}

const header = StyleSheet.create({
    container: {
        width: "80%",
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "lightblue"
    },
    avatar: {
        backgroundColor: "green",
        height: 70,
        width: 70,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10
    },
    // text: {
    //     textAlign: "right"
    // }
})
export default MainHeader