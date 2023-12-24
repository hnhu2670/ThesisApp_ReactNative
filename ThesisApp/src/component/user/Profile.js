import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
    const [user, dispatch] = useContext(MyUserContext);
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
        console.log("link ảnh", user.avatar)
    })
    return (
        <View >
            <View style={{
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={profile.name}>
                    <Image
                        style={profile.container}
                        source={{ uri: user.avatar }}
                    />
                </View>
                <View style={profile.name}>
                    <Text style={[styles.font, { fontSize: 25 }]}>
                        {user.first_name} {user.last_name}
                    </Text>
                    <Text style={profile.text}>
                        Chức vụ: {user.role}
                    </Text>
                </View>

            </View>

            <View>
                <View

                    style={[profile.item, { flexDirection: "row" }]}>
                    <Text
                        onPress={update}
                        style={[styles.font, { fontSize: 16, width: "85%" }]}>Cập nhật thông tin cá nhân</Text>

                    {/* <Icon name="documents" size={25} style={{ paddingLeft: 20, paddingRight: 10, textAlign: "right" }} /> */}
                </View>
                <View

                    style={[profile.item, { flexDirection: "row" }]}>
                    <Text
                        onPress={change}
                        style={[styles.font, { fontSize: 16, width: "85%" }]}>Đổi mật khẩu</Text>

                    {/* <Icon name="documents" size={25} style={{ paddingLeft: 20, paddingRight: 10, textAlign: "right" }} /> */}
                </View>
                <View style={[profile.item, { flexDirection: "row" }]}>
                    <Text
                        onPress={logout}
                        style={[styles.font, { fontSize: 16, width: "85%" }]}>Đăng xuất</Text>

                    {/* <Icon name="documents" size={25} style={{ paddingLeft: 20, paddingRight: 10, textAlign: "right" }} /> */}
                </View>
            </View>
        </View>
    )
}
const profile = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 200,
        height: 200,
        borderColor: "green",
        borderWidth: 2,
        marginTop: 20
    },
    name: {
        marginBottom: 25
    },
    item: {
        // margin: 20,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        width: "90%",
        height: 70,
        borderColor: "white",
        borderWidth: 2,
        alignItems: "center",
        paddingLeft: 20,
        alignContent: "space-around"

    },
    content: {
        fontSize: 20,

    },
    text: {
        textAlign: "center",
        fontSize: 15,
        color: "gray",
        marginBottom: 20,
        marginTop: 20
    }
});

export default Profile