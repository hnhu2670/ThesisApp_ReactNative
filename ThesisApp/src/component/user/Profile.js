import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MyUserContext } from '../../../App';
import login from '../../login/style';

const Profile = () => {
    const [user, dispatch] = useContext(MyUserContext);
    return (
        <View >
            <View style={{
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    style={profile.container}
                />
            </View>

            <View style={login.text_input}>
                <Text style={[login.text]}>Họ</Text>
                <TextInput
                    style={login.input}
                    placeholder='Họ'
                    value={user.data.first_name}

                />
            </View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Tên</Text>
                <TextInput
                    style={login.input}
                    placeholder='Tên'
                    value={user.data.last_name}

                />
            </View>
            <View style={login.text_input}>
                <Text style={[login.text]}>Tên đăng nhập</Text>
                <TextInput
                    style={login.input}
                    placeholder='Tên đăng nhập'
                    value={user.data.username}

                />
            </View>
            <View style={login.text_input}>
                <Text style={login.text}>Mật khẩu</Text>
                <TextInput
                    style={login.input}
                    placeholder='Mật khẩu'
                    secureTextEntry
                    value={user.data.password}

                />
            </View>

            <View style={login.text_input}>
                <TouchableOpacity>
                    <Text style={login.button}

                    >CẬP NHẬT</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}
const profile = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 150,
        height: 150,
        backgroundColor: "green",
        marginTop: 15
    },
});

export default Profile