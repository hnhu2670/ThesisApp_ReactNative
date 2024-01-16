import React, { useContext, useEffect, useState } from 'react'
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import login from '../../login/style'
import { MyUserContext } from '../../../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiToken, endpoints } from '../../configs/Apis';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';
import { Fontisto } from '@expo/vector-icons';
import styles from '../../assets/js/style';



const Update = ({ navigation }) => {

    const [show, setShow] = useState(false)
    const showMode = () => {
        setShow(true)
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        myuser['date_of_birth'] = selectedDate.toISOString().split("T")[0]
        console.log('===============', selectedDate.toISOString().split("T")[0])
        setShow(false)
    };

    const [current_user, dispatch] = useContext(MyUserContext);
    const [date, setDate] = useState(new Date(current_user.date_of_birth));

    const [myuser, setMyUser] = useState({
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "phone": current_user.phone,
        // "gender": current_user.gender,
        "address": current_user.address,
        // "date_of_birth": date.toISOString().split("T")[0]
        "date_of_birth": date.toISOString().split("T")[0]
    })
    // let date = new Date(current_user.date_of_birth)

    console.log("thông tin user: ", date.toISOString())
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
                    console.log(myuser[field])
                }
                console.log('form data', form)
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
                console.log("lỗi", err.request);
            }
        }
        process()
    }
    // useEffect(() => {
    //     updateUser()
    // }, [])
    return (
        <View >
            <ScrollView style={{ height: '85%' }}>
                <View style={login.text_input} >
                    <Text style={[login.text]}> Tên đăng nhập </Text>
                    < TextInput
                        style={login.input}
                        placeholder='Tên đăng nhập'
                        value={current_user.username}
                        editable={false}

                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    < View style={[login.text_input, { width: '45%' }]} >
                        <Text style={[login.text]}> Họ </Text>
                        < TextInput
                            style={login.input}
                            placeholder='Họ'
                            value={myuser.first_name}
                            onChangeText={text => change(text, "first_name")} />
                    </View>
                    < View style={[login.text_input, { width: '45%', marginLeft: 0 }]} >
                        <Text style={[login.text]}> Tên </Text>
                        <TextInput
                            style={login.input}
                            placeholder='Tên'
                            value={myuser.last_name}
                            onChangeText={text => change(text, "last_name")} />
                    </View>

                </View>
                {/* < View style={login.text_input} >
                    <Text style={[login.text]}> Giới tính </Text>
                    < TextInput
                        style={login.input}
                        placeholder='Giới tính'
                        value={myuser.gender}
                        onChangeText={text => change(text, "gender")}

                    />
                </View> */}
                < View style={login.text_input} >
                    <Text style={[login.text]}>Ngày sinh</Text>
                    <TouchableOpacity onPress={() => showMode()}>
                        <View style={[login.input, {
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-around'
                        }]}>
                            <Text style={{ width: '90%' }}>{moment(date).format('DD/MM/YYYY')}</Text>
                            <Fontisto name='date' size={20} />
                        </View>
                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                < View style={login.text_input} >
                    <Text style={[login.text]}> Địa chỉ</Text>
                    < TextInput
                        style={login.input}
                        placeholder='Địa chỉ'
                        value={myuser.address}
                        onChangeText={text => change(text, "address")} />
                </View>

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
            </ScrollView>

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