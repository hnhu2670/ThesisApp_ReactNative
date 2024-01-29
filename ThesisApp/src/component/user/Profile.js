import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import profile from './style';
import ChangeAvatar from './ChangeAvatar';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import color from '../../assets/js/color';


const Profile = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    };

    const update = () => {
        navigation.navigate("Cập nhật thông tin")
    }
    const change = () => {
        navigation.navigate("Đổi mật khẩu")
    }
    useEffect(() => {
        // console.log("url avatar", current_user.avatar)
    }, [])
    return (
        <View style={[{ backgroundColor: color.green }]}>
            <View style={[profile.top]}>
                <ChangeAvatar />
            </View>
            <View style={[profile.bottom]}>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={update}>
                        <AntDesign style={[profile.icon, { marginRight: 15 }]} color="gray" name="profile" size={20} />
                        <Text

                            style={[styles.font, profile.link]}>Cập nhật thông tin cá nhân
                        </Text>
                        <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                    </TouchableOpacity>
                </View>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={change}>
                        <Entypo style={[profile.icon, { marginRight: 15 }]} color="gray" name="lock" size={20} />

                        <Text
                            style={[styles.font, profile.link]}>Thay đổi mật khẩu
                        </Text>
                        <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                    </TouchableOpacity>


                </View>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={logout}>
                        <AntDesign style={[profile.icon, { marginRight: 15 }]} color="gray" name="logout" size={20} />

                        <Text
                            style={[styles.font, profile.link]}>Đăng xuất
                        </Text>
                        <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default Profile