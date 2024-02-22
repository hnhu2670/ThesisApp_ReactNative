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
import ToastifyMessage from '../layout/ToastifyMessage';
import profile from './style';



const Update = ({ navigation }) => {

    const [show, setShow] = useState(false)
    const [form, setForm] = useState('')
    const [message, setMessage] = useState('')
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
        "address": current_user.address,
        "date_of_birth": date.toISOString().split("T")[0]
    })
    // console.log("thông tin user: ", date.toISOString())
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
                setForm('success')
                setMessage('Cập nhật thành công')
                // lưu lại thông tin user vào AsyncStorage
                // await AsyncStorage.setItem('user', JSON.stringify(response.data));

                dispatch({ type: 'login', payload: response.data });
                setTimeout(() => {
                    navigation.navigate('ThesisApp')
                }, 1300)
                // alert("Cập nhật thành công")
            } catch (err) {
                console.log("lỗi", err.request);
                setForm('error')
                setMessage('Cập nhật thất bại')
            }
        }
        process()
    }
    useEffect(() => {
        if (form !== '') {
            const timer = setTimeout(() => {
                setForm('');
            }, 1500);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [form])
    return (
        <View style={[styles.container]}>
            <ScrollView style={[profile.scroll]}>
                <View style={[profile.text_input, { marginTop: 0 }]} >
                    <Text style={[login.text]}> Tên đăng nhập </Text>
                    < TextInput
                        style={profile.input}
                        placeholder='Tên đăng nhập'
                        value={current_user.username}
                        editable={false}

                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    < View style={[profile.text_input, { width: '45%' }]} >
                        <Text style={[login.text]}> Họ </Text>
                        < TextInput
                            style={profile.input}
                            placeholder='Họ'
                            value={myuser.first_name}
                            onChangeText={text => change(text, "first_name")} />
                    </View>
                    < View style={[profile.text_input, { width: '45%', marginLeft: 0 }]} >
                        <Text style={[login.text]}> Tên </Text>
                        <TextInput
                            style={profile.input}
                            placeholder='Tên'
                            value={myuser.last_name}
                            onChangeText={text => change(text, "last_name")} />
                    </View>

                </View>
                < View style={profile.text_input} >
                    <Text style={[login.text]}>Ngày sinh</Text>
                    <TouchableOpacity onPress={() => showMode()}>
                        <View style={[profile.input, {
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
                < View style={profile.text_input} >
                    <Text style={[login.text]}> Địa chỉ</Text>
                    < TextInput
                        style={profile.input}
                        placeholder='Địa chỉ'
                        value={myuser.address}
                        onChangeText={text => change(text, "address")} />
                </View>

                < View style={profile.text_input} >
                    <Text style={[login.text]}> Điện thoại </Text>
                    < TextInput
                        style={profile.input}
                        placeholder='Điện thoại'
                        value={myuser.phone || ""}
                        onChangeText={text => change(text, "phone")}

                    />
                </View>
                < View style={profile.text_input} >
                    <Text style={[login.text]}> Email </Text>
                    < TextInput
                        style={profile.input}
                        placeholder='email'
                        value={myuser.email}
                        onChangeText={text => change(text, "email")}

                    />
                </View>
            </ScrollView>
            <View style={login.text_input}>
                <TouchableOpacity onPress={updateUser}>
                    <Text style={login.button} >THAY ĐỔI</Text>
                </TouchableOpacity>
            </View>
            {form === 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={message}
                    description="Thêm thành công"
                />
            )}
            {form === 'success' && (
                <ToastifyMessage
                    type="success"
                    text={message}
                    description="Thêm thất bại"
                />
            )}
        </View>

    )
}
export default Update