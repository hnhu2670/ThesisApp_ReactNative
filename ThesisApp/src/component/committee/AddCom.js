import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import login from '../../login/style';
import { AntDesign } from '@expo/vector-icons';
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../thesis/style';
import axios from 'axios';
import color from '../../assets/js/color';
import ToastifyMessage from '../layout/ToastifyMessage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AddCom = ({ navigation }) => {
    const [nameComm, setNameComm] = useState('')
    const [member, setMember] = useState([])
    const [selectedPres, setSelectedPres] = useState('');//chủ tịch
    const [selectedSecr, setSelectedSecr] = useState('')//thư ký
    const [selectedMember, setSelectedMember] = useState('');//phản biện
    const [selectedMember1, setSelectedMember1] = useState('');
    const [selectedMember2, setSelectedMember2] = useState('');

    const [show, setShow] = useState('')
    const [error, setError] = useState('')

    const listMember = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const { data } = await authApiToken(token).get(`${endpoints["get-user-role"]("all")}&role=lecturer`);
            setMember(data);
            // console.log('danh sách thành viên', data[0])

        } catch (error) {
            console.log("Lỗi getMember:", error);
        }
    }

    const addMember = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        if (nameComm === '') {
            setShow('error')
            setError("Tên hội đồng không được rỗng")
        }
        else {

            formData.append('name', nameComm)
            // member 1 ==> ktra dữ liệu có được lấy không
            if (selectedPres.id !== undefined) {
                formData.append('member1', selectedPres.id)
            }
            //member 2
            if (selectedSecr.id !== undefined) {
                formData.append('member2', selectedSecr.id)
            }
            //member 3
            if (selectedMember.id !== undefined) {
                formData.append('member3', selectedMember.id)
            }
            //member 4
            if (selectedMember1.id !== undefined) {
                formData.append('member4', selectedMember1.id)
            }
            //member 5
            if (selectedMember2.id !== undefined) {
                formData.append('member5', selectedMember2.id || '')
            }
            formData.append('position1', '1')
            formData.append('position2', '2')
            formData.append('position3', '3')
            formData.append('position4', '4')
            formData.append('position5', '5')
            console.log('dữ liệu lấy được', formData)

            try {
                const res = await authApiToken(token).post(endpoints['add-all-member'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                // console.log(res.status)
                setShow('success')
                setError("Thêm hội đồng thành công")
                setTimeout(() => {
                    navigation.navigate('ThesisApp')
                }, 3000)
                console.log('dữ liệu mới thêm', res.data)
            } catch (error) {
                console.log("lỗi hàm add member: ", error.request.responseText)
                setShow('error')
                setError("Thêm hội đồng thất bại")
            }
        }

    }
    useEffect(() => {
        listMember()
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [show]);
    return (
        <View style={[{ backgroundColor: color.background }]}>
            <ScrollView style={{ marginBottom: 10, height: windowHeight * 0.8 }}>
                <View style={login.text_input} >
                    <Text style={[login.text]}>Tên hội đồng</Text>
                    <TextInput
                        style={[login.input]}
                        placeholder='Nhập tên hội đồng'
                        value={nameComm}
                        onChangeText={text => setNameComm(text)}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Chủ tịch hội đồng</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="id" // Trường giá trị hiển thị
                        data={member.map((m) => ({
                            label: `${m.first_name} ${m.last_name}`,
                            id: `${m.id}`
                        }))}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        value={selectedPres} // Giá trị được lưu
                        onChange={(item) => {
                            setSelectedPres(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Thư kí</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="id" // Trường giá trị hiển thị
                        data={member.map((m) => ({
                            label: `${m.first_name} ${m.last_name}`,
                            id: `${m.id}`
                        }))}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        value={selectedSecr} // Giá trị được lưu
                        onChange={(item) => {
                            setSelectedSecr(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Giảng viên phản biện</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="id" // Trường giá trị hiển thị
                        data={member.map((m) => ({
                            label: `${m.first_name} ${m.last_name}`,
                            id: `${m.id}`
                        }))}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        value={selectedMember} // Giá trị được lưu
                        onChange={(item) => {
                            setSelectedMember(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Thành viên 1</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="id" // Trường giá trị hiển thị
                        data={member.map((m) => ({
                            label: `${m.first_name} ${m.last_name}`,
                            id: `${m.id}`
                        }))}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        value={selectedMember1} // Giá trị được lưu
                        onChange={(item) => {
                            setSelectedMember1(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </View>
                <View style={[login.text_input, { paddingBottom: 20 }]}>
                    <Text style={[login.text]}>Thành viên 2</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="id" // Trường giá trị hiển thị
                        data={member.map((m) => ({
                            label: `${m.first_name} ${m.last_name}`,
                            id: `${m.id}`
                        }))}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        value={selectedMember2} // Giá trị được lưu
                        onChange={(item) => {
                            setSelectedMember2(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </View>
            </ScrollView>

            <View style={[login.text_input, { marginTop: 0 }]}>
                <TouchableOpacity onPress={addMember}>
                    <Text style={login.button}
                    >THÊM</Text>
                </TouchableOpacity>
            </View>
            {show === 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={error}
                    description="Thêm thành công"
                />
            )}
            {show === 'success' && (
                <ToastifyMessage
                    type="success"
                    text={error}
                    description="Thêm thất bại"
                />
            )}

        </View>
    );
};
export default AddCom;