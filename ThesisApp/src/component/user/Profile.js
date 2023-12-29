import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import profile from './style';
import ChangeAvatar from './ChangeAvatar';


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

    return (
        <View >
            <ChangeAvatar />

            <View>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Text
                            onPress={update}
                            style={[styles.font, profile.link]}>Cập nhật thông tin cá nhân
                        </Text>
                        <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                    </TouchableOpacity>


                </View>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Text
                            onPress={change}
                            style={[styles.font, profile.link]}>Thay đổi mật khẩu
                        </Text>
                        <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                    </TouchableOpacity>


                </View>
                <View
                    style={[profile.item, { flexDirection: "row" }]}>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Text
                            onPress={logout}
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