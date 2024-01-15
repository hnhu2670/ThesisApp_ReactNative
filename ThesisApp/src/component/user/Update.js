import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import login from '../../login/style'
import { MyUserContext } from '../../../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiToken, endpoints } from '../../configs/Apis';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'



const Update = ({ navigation }) => {

    // const [date, setDate] = useState(new Date())
    // const [show, setShow] = useState(false)
    // const [mode, setMode] = useState('date')
    // const onChange = (e, selectedDate) => {
    //     setDate(selectedDate)
    //     setShow(false)
    // }
    // const showMode = (modeToShow) => {
    //     setShow(true)
    // }
    const [current_user, dispatch] = useContext(MyUserContext);
    const [myuser, setMyUser] = useState({
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "phone": current_user.phone
    })
    // console.log("thông tin user: ", myuser)
    const change = (value, field) => {
        setMyUser(user => ({
            ...user,
            [field]: value
        }));
    };

    const updateUser = () => {

        const process = async () => {
            const token = await AsyncStorage.getItem('token')
            console.log("token", token)
            try {
                let form = new FormData();
                for (let field in myuser) {
                    form.append(field, myuser[field]);
                    // console.log(myuser[field])
                }
                const response = await authApiToken(token).patch(endpoints["update-user"](current_user.id), form, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                // console.log(response.status);
                // console.log('usserupdate', response.data);
                // lưu lại thông tin user vào AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(response.data));

                dispatch({ type: 'login', payload: response.data });
                alert("Cập nhật thành công")
            } catch (err) {
                console.log("lỗi", err);
            }

        }
        process()
    }
    // useEffect(() => {
    //     updateUser()
    // }, [])
    return (
        <View>
            <View style={login.text_input} >
                <Text style={[login.text]}> Tên đăng nhập </Text>
                < TextInput
                    style={login.input}
                    placeholder='Tên đăng nhập'
                    value={current_user.username}
                    editable={false}

                />
            </View>
            < View style={login.text_input} >
                <Text style={[login.text]}> Họ </Text>
                < TextInput
                    style={login.input}
                    placeholder='Họ'
                    value={myuser.first_name}
                    onChangeText={text => change(text, "first_name")} />
            </View>
            < View style={login.text_input} >
                <Text style={[login.text]}> Tên </Text>
                <TextInput
                    style={login.input}
                    placeholder='Tên'
                    value={myuser.last_name}
                    onChangeText={text => change(text, "last_name")} />
            </View>
            {/* < View style={login.text_input} >
                <Text>Ngày</Text>
                <Text style={[login.text]} onPress={() => showMode("date")}> Ngày sinh </Text>
                <Text style={[login.text]} onPress={() => showMode("time")}> Giờ </Text>
                {show && (
                    <DateTimePickerAndroid
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
                <Text>{date.toLocaleString()}</Text>

            </View> */}
            < View style={login.text_input} >
                <Text style={[login.text]}> Điện thoại </Text>
                < TextInput
                    style={login.input}
                    placeholder='Điện thoại'
                    value={myuser.phone || ""}
                    onChangeText={text => change(text, "phone")}

                />
            </View>
            < View style={login.text_input} >
                <Text style={[login.text]}> Email </Text>
                < TextInput
                    style={login.input}
                    placeholder='email'
                    value={myuser.email}
                    onChangeText={text => change(text, "email")}

                />
            </View>
            <View style={[login.text_input, { flexDirection: "row" }]} >
                < View style={{ width: '50%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Text style={login.button}

                        > RỜI KHỎI</Text>
                    </TouchableOpacity>

                </View>
                < View style={{ width: '50%' }}>
                    <TouchableOpacity>
                        <Text style={login.button}
                            onPress={updateUser}
                        > CẬP NHẬT </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>

    )
}
export default Update