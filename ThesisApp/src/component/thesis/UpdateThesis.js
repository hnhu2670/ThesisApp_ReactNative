import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import GetCom from './GetCom'
import login from '../../login/style'
import styles from '../../assets/js/style'
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown'
import thesis from './style'
import ToastifyMessage from '../layout/ToastifyMessage'
import color from '../../assets/js/color'



const UpdateThesis = ({ route, navigation }) => {
    const { id, name } = route.params;
    const [show, setShow] = useState('') //thông báo
    const [messager, setMessager] = useState('')
    const [student, setStudent] = useState(null)
    const [teachers, setTeachers] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [listStudents, setListStudents] = useState([])s
    const [listThesis, setListThesis] = useState([])

    const [nameThesis, setNameThesis] = useState({
        'name': name
    })
    // console.log('name', name)
    const [changeGv1, setChangeGv1] = useState([])
    const [changeGv2, setChangeGv2] = useState([])
    const [changeComm, setChangeComm] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])

    const [getDefault1, setGetDefault1] = useState(null)
    const [getDefault2, setGetDefault2] = useState(null)
    const [getDefault3, setGetDefault3] = useState(null)

    // lấy id sinh viên hiện tại

    const getIdStudent = (data) => {
        // console.log('==============', data)
        var id_student = ''
        data?.map(s => {
            console.log(s)
            if (id_student == '') {
                id_student = id_student + s
            } else {
                id_student = id_student + ',' + s
            }
        })
        setStudent(id_student)
        console.log("student", id_student)
    }

    // thay đổi giá trị sinh viên
    const chageMultipleSelect = (values) => {
        var id_student = ''
        values?.map(s => {
            console.log(s)
            if (id_student == '') {
                id_student = id_student + s
            } else {
                id_student = id_student + ',' + s
            }
        })
        setStudent(id_student)
        console.log("student", student)
    };
    // lấy thông tin khóa luận hiện tại
    const getList = async () => {
        const { data } = await axios.get(endpoints["get-thesis"](id))
        // console.log('thông tin--------------', data)
        setListThesis(data)

        return data
    }
    // lấy ds giảng viên
    const getListTeacher = async () => {
        const token = await AsyncStorage.getItem('token')

        const { data } = await authApiToken(token).get(`${endpoints["get-user-role"]("all")}&role=lecturer`);
        setTeachers(data);
        // console.log('getList', data)

        return data
    }
    // lấy thông tin hội đồng ==> để hiển thị tên

    const getCommittee = async () => {
        try {
            let data = await getList() //gọi lại hàm getList
            const res = await axios.get(`${endpoints["list-committes"]("all")}&status=Open`);

            // console.log("res.data", res.data)
            const listComm = res.data
            listComm.forEach(element => {
                setData3(pre =>
                    [...pre, { value: element.id, label: `${element.name}` }]
                )
                if (data.committee != undefined) {
                    changeComm.value = data.committee.id
                    if (element.id == data.committee.id) {
                        setGetDefault3(element.id)
                    }
                }

            });
        } catch (error) {
            console.log("lỗi commmmmmm..............", error)
        }
    }

    // lấy gv1
    const getGv1 = async () => {
        try {
            // console.log('gv1---------------------------------')
            let data = await getList() //gọi lại hàm getList
            let listTeacher = await getListTeacher()
            // console.log('teacher', listTeacher)
            // changeGv1.value=
            listTeacher.forEach(element => {

                setData1(pre =>
                    [...pre, { value: element.id, label: `${element.last_name} ${element.first_name} ` }]
                )
                if (data.supervisors[0] != undefined) {
                    changeGv1.value = data.supervisors[0]?.user.id
                    if (element.id == data.supervisors[0]?.user.id) {
                        setGetDefault1(element.id)
                    }
                }
            })
        } catch (error) {
            console.log("lỗi gv1..............", error)
        }
    }

    // lấy gv2
    const getGv2 = async () => {
        try {
            // console.log('gv2---------------------------------')
            let data = await getList() //gọi lại hàm getList
            let listTeacher = await getListTeacher()
            // console.log('gv2', listTeacher)
            listTeacher.forEach(element => {

                setData2(pre =>
                    [...pre, { value: element.id, label: `${element.last_name} ${element.first_name} ` }]
                )
                if (data.supervisors[1] != undefined) {
                    changeGv2.value = data.supervisors[1]?.user.id
                    if (element.id == data.supervisors[1]?.user.id) {
                        setGetDefault2(element.id)
                    }
                }
            })
        } catch (error) {
            console.log("lỗi gv2..............", error)
        }
    }
    // lấy giá trị hiện tại để hiện lên
    const defaultSelet = (itemValue) => {
        setGetDefault1(itemValue)
        setGetDefault2(itemValue)
        setGetDefault3(itemValue)
        // console.log(value)
    }
    // hàm update
    const updateName = (value, field) => {
        setNameThesis(e => ({
            ...e,
            [field]: value
        }));
    };

    const change = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        formData.append("giangvien1", changeGv1.value || '')
        formData.append("giangvien2", changeGv2.value || '')
        formData.append("sinhvien", student)
        formData.append("committee", changeComm.value || '')
        formData.append("name", nameThesis.name || '')
        console.log("form data", formData)
        try {
            setLoading(true)
            const { data } = await authApiToken(token).patch(endpoints['update-thesis'](id), formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setShow('success')
            setMessager("Cập nhật thành công")
            setLoading(false)
            setTimeout(() => {
                navigation.navigate('ThesisApp');
            }, 800);
            // console.log('Cập nhật thành công nhe', data)
            await getList()

        } catch (error) {
            console.log("lỗi rồi nhe bạn ơi update thesis..............", error)
            setLoading(false)
            setShow('error')
            setMessager("Đã xảy ra lỗi")
            // err = error.request.responseText
            // e = JSON.parse(err)
            // setShow('error')
            // setMessager(err)
        }

    }

    useEffect(() => {
        getList()
        getListTeacher()
        getCommittee()
        getGv1()
        getGv2()
        getIdStudent()
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 1000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [id, show])
    return (
        <View>
            <View style={thesis.top}>
                <View style={thesis.img}>
                    <Image
                        style={thesis.image}
                        source={{ uri: 'https://res.cloudinary.com/dhdca9ibd/image/upload/v1704853796/tpkzdjwc1xtfmx7ov6ym.png' }} />
                </View>

            </View>
            <View style={thesis.bottom}>
                <TextInput style={[thesis.inputName]}
                    value={nameThesis.name}
                    onChangeText={text => updateName(text, "name")} />
                <ScrollView >
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Danh sách sinh viên hiện tại </Text>
                        <Text style={{ marginLeft: 20, marginBottom: 0 }}>
                            {listThesis?.students?.length > 0 ? <>
                                {
                                    listThesis?.students?.map(s => {
                                        return (<>
                                            <Text key={s.user.id} style={{ color: 'gray', fontStyle: 'italic', fontSize: 15 }}>
                                                {s.user.first_name + " " + s.user.last_name}{'\n'}
                                            </Text>
                                        </>
                                        )
                                    })}
                            </> : <>
                                <Text style={{ fontStyle: 'italic', color: 'gray' }}>Chưa có sinh viên thực hiện khóa luận</Text>
                            </>}
                        </Text>
                    </View>
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Danh sách sinh viên </Text>

                        <GetStudent getIdStudents={getIdStudent}
                            setSelected={chageMultipleSelect}
                        />
                    </View>
                    {/* hội đồng */}
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Danh sách hội đồng </Text>

                        <Dropdown
                            style={thesis.dropdown}
                            placeholderStyle={thesis.placeholderStyle}
                            selectedTextStyle={thesis.selectedTextStyle}
                            inputSearchStyle={thesis.inputSearchStyle}
                            iconStyle={thesis.iconStyle}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value" // Trường giá trị hiển thị
                            data={data3}
                            value={getDefault3}
                            placeholder="Chọn hội đồng"
                            searchPlaceholder="Tìm tên giảng viên..."
                            onSelect={defaultSelet}
                            onChange={(item) => {
                                setChangeComm(item); // Gọi hàm sendIdTeacher với giá trị id
                            }}
                        />
                    </View>
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Giảng viên hướng dẫn 1 </Text>

                        <Dropdown
                            style={thesis.dropdown}
                            placeholderStyle={thesis.placeholderStyle}
                            selectedTextStyle={thesis.selectedTextStyle}
                            inputSearchStyle={thesis.inputSearchStyle}
                            iconStyle={thesis.iconStyle}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value" // Trường giá trị hiển thị
                            data={data1}
                            value={getDefault1}
                            placeholder="Chọn giảng viên"
                            searchPlaceholder="Tìm tên giảng viên..."
                            onSelect={defaultSelet}
                            onChange={(item) => {
                                setChangeGv1(item); // Gọi hàm sendIdTeacher với giá trị id
                            }}
                        />
                    </View>
                    <View style={[thesis.text_input, { marginBottom: 20 }]}>
                        <Text style={login.text}>Giảng viên hướng dẫn 2 </Text>

                        <Dropdown
                            style={thesis.dropdown}
                            placeholderStyle={thesis.placeholderStyle}
                            selectedTextStyle={thesis.selectedTextStyle}
                            inputSearchStyle={thesis.inputSearchStyle}
                            iconStyle={thesis.iconStyle}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value" // Trường giá trị hiển thị
                            data={data2}
                            value={getDefault2}
                            placeholder="Chọn giảng viên"
                            searchPlaceholder="Tìm tên giảng viên..."
                            onSelect={defaultSelet}
                            onChange={(item) => {
                                setChangeGv2(item); // Gọi hàm sendIdTeacher với giá trị id
                            }}
                        />
                    </View>
                </ScrollView>
                {loading === true ? <><ActivityIndicator /></> : <>
                    <View style={[thesis.text_input, { marginTop: -25 }]} >
                        <TouchableOpacity onPress={change}>
                            <Text style={login.button}
                            >CẬP NHẬT KHÓA LUẬN</Text>
                        </TouchableOpacity>

                    </View>
                </>}
            </View >
            {show == 'success' && (
                <ToastifyMessage
                    type="success"
                    text={messager}
                    description="Cập nhật thành công"
                />
            )}
            {show == 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={messager}
                    description="Cập nhật thất bại"
                />
            )}
        </View>
    )
}

export default UpdateThesis