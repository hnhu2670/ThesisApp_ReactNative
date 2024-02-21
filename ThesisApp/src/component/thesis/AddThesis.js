// update theo id
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import login from '../../login/style'
import GetCom from './GetCom'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thesis from './style'
import ToastifyMessage from '../layout/ToastifyMessage'
const AddThesis = ({ navigation }) => {
    const [listthesis, setThesis] = useState('')
    const [student, setStudent] = useState(null)
    const [teacher1, setTeacher1] = useState(null)
    const [teacher2, setTeacher2] = useState(null)
    const [comm, setComm] = useState(null)

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState('')
    const [error, setError] = useState('')
    const getIdStudent = (data) => {
        var id_student = ''
        data.map(s => {
            // id_student = id_student + ',' + s
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
    const getIdTeacher1 = (data) => {
        setTeacher1(data)
        console.log('gv1', data)
    }

    const getIdTeacher2 = (data) => {
        setTeacher2(data)
        console.log("gv2", data)

    }
    const getIdCommittee = (data) => {
        setComm(data)
        console.log("hội đồng", data)

    }
    const addNewThesis = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        formData.append("committee", comm)
        formData.append("sinhvien", student)
        formData.append("giangvien1", teacher1)
        formData.append("giangvien2", teacher2)
        formData.append("name", listthesis)

        console.log("dữ liệu:---------", formData)


        if (listthesis) {
            if (student === null) {
                // alert("Chọn sinh viên thực hiện khóa luận")
                setShow('error')
                setError('Chọn sinh viên thực hiện khóa luận')
            } else if (teacher1 === null) {
                // alert("Phải chọn giảng viên hướng dẫn")
                setShow('error')
                setError('Phải chọn giảng viên hướng dẫn')
            } else {
                try {
                    setLoading(true)
                    const { data } = await authApiToken(token).post(endpoints["add-thesis"], formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    console.log("thành công-----------", data)
                    setShow('success')
                    setError('Thêm khóa luận thành công')
                    setLoading(false)
                    setTimeout(() => {
                        navigation.navigate('ThesisApp')
                    }, 1500)

                } catch (error) {
                    console.log("lỗi..............", error.request.responseText)
                    err = error.request.responseText
                    e = JSON.parse(err)
                    // alert(e.error)
                    setShow('error')
                    setError(err)
                    setLoading(false)
                }
            }

        }
        else {
            setShow('error')
            setError('Nhập tên khóa luận')
        }
    }
    useEffect(() => {
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [show]);
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
                <ScrollView >
                    <View style={[thesis.text_input]}>
                        <Text style={login.text}>Tên khóa luận mới </Text>
                        <TextInput
                            style={[login.input, { fontSize: 16 }]}
                            placeholder='Tên khóa luận'
                            value={listthesis}
                            onChangeText={text => setThesis(text)}
                        />
                    </View>
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Danh sách sinh viên </Text>

                        <GetStudent getIdStudents={getIdStudent}
                        />
                    </View>
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Giảng viên hướng dẫn 1 </Text>

                        <GetTeacher getTecher={getIdTeacher1} />
                    </View>
                    <View style={thesis.text_input}>
                        <Text style={login.text}>Giảng viên hướng dẫn 2  </Text>

                        <GetTeacher getTecher={getIdTeacher2} />
                    </View>
                    <View style={[thesis.text_input, { paddingBottom: 20 }]}>
                        <Text style={login.text}>Hội đồng bảo vệ </Text>

                        <GetCom getTecher={getIdCommittee} />
                    </View>

                </ScrollView>
                {loading === true ? <><ActivityIndicator /></> : <>
                    <View style={[thesis.text_input]}>
                        <TouchableOpacity onPress={addNewThesis}>
                            <Text style={login.button}
                            >THÊM KHÓA LUẬN MỚI</Text>
                        </TouchableOpacity>

                    </View>
                </>}

            </View >
            {show === 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={error}
                    description="Cập nhật thất bại"
                />
            )}
            {show === 'success' && (
                <ToastifyMessage
                    type="success"
                    text={error}
                    description="Cập nhật thất bại"
                />
            )}
        </View>


    )
}

export default AddThesis