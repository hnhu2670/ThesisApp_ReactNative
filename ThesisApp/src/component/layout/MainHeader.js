import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';


const MainHeader = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [userInfor, setUserInfor] = useState('');


    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    const getUser = async () => {
        try {
            const res = await axios.get(`http://192.168.1.5:8000/get-users/${current_user.id}/`)
            console.log(res.data.avatar);
            if (res.status === 200) {
                const result = await res.data;
                setUserInfor(result);
                // console.log("ảnh", current_user.data.avatar)
                console.log(res.data)

            } else {
                console.log(Error)
            }
        } catch (error) {
            console.log("lỗi tại đây", error)
        }

    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={header.container}>
                <View>
                    <Image
                        style={header.avatar}
                        source={{ uri: userInfor?.avatar }}
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