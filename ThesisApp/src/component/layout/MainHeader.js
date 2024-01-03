import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainHeader = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [userInfor, setUserInfor] = useState('');


    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    // const getUser = async () => {
    //     const token = await AsyncStorage.getItem('token')
    //     console.log("token", token)
    //     try {
    //         console.log(current_user.id)
    //         const res = await authApiToken(token).get(endpoints['get-user'](current_user.id))
    //         console.log(res.data.avatar);
    //         if (res.status === 200) {
    //             const result = await res.data;
    //             setUserInfor(result);
    //             // console.log(res.data)

    //         } else {
    //             console.log(Error)
    //         }
    //     } catch (error) {
    //         console.log("mainheader", error)
    //     }

    // }
    // useEffect(() => {
    //     getUser();
    // }, [])
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={header.container}>
                <View>
                    <Image
                        style={header.avatar}
                        source={{ uri: current_user?.avatar_url }}
                    />
                </View>
                <View >
                    <Text style={header.text}
                        onPress={goToProfile}>
                        Hello, {current_user.first_name} {current_user.last_name} !!!!!!</Text>
                    <Text style={header.text}>{current_user.role}</Text>
                </View>

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
        // backgroundColor: "green",
        height: 70,
        width: 70,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "green",
        marginLeft: 10,
        marginRight: 10
    },
    // text: {
    //     textAlign: "right"
    // }
})
export default MainHeader