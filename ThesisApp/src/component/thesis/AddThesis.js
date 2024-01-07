// update theo id
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import login from '../../login/style'
import GetCom from './GetCom'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thesis from './style'
const AddThesis = () => {
    const [listthesis, setThesis] = useState('')
    const [student, setStudent] = useState(null)
    const [teacher1, setTeacher1] = useState(null)
    const [teacher2, setTeacher2] = useState(null)
    const [comm, setComm] = useState(null)

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
                alert("Chọn sinh viên thực hiện khóa luận")
            } else if (teacher1 === null) {
                alert("Phải chọn giảng viên hướng dẫn")
            } else {
                try {
                    const { data } = await authApiToken(token).post(endpoints["add-thesis"], formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    console.log("data-----------", data)
                } catch (error) {
                    console.log("lỗi..............", error.request.responseText)
                    err = error.request.responseText
                    e = JSON.parse(err)
                    alert(e.error)
                }
            }

        }
        else { alert("tên khóa luận không được rỗng") }
    }

    return (
        // <View style={thesis.container}>
        //     <View style={[thesis.text_input]}>
        //         <Text style={login.text}>Tên khóa luận mới </Text>

        //         <TextInput
        //             style={[login.input, { fontSize: 16 }]}
        //             placeholder='Tên khóa luận'
        //             value={thesis}
        //             onChangeText={text => setThesis(text)}
        //         />
        //     </View>
        //     <View style={thesis.text_input}>
        //         <Text style={login.text}>Danh sách sinh viên </Text>

        //         <GetStudent getIdStudents={getIdStudent}
        //         />
        //     </View>
        //     <View style={thesis.text_input}>
        //         <Text style={login.text}>Giảng viên hướng dẫn 1 </Text>

        //         <GetTeacher getTecher={getIdTeacher1} />
        //     </View>
        //     <View style={thesis.text_input}>
        //         <Text style={login.text}>Giảng viên hướng dẫn 2 </Text>

        //         <GetTeacher getTecher={getIdTeacher2} />
        //     </View>
        //     <View style={thesis.text_input}>
        //         <Text style={login.text}>Danh sách hội đồng</Text>

        //         <GetCom getTecher={getIdCommittee} />
        //     </View>
        //     <View style={[thesis.text_input]}>
        //         <TouchableOpacity onPress={addNewThesis}>
        //             <Text style={login.button}
        //             >THÊM KHÓA LUẬN MỚI</Text>
        //         </TouchableOpacity>

        //     </View>

        // </View>
        <View >
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
                <Text style={login.text}>Giảng viên hướng dẫn 2 </Text>

                <GetTeacher getTecher={getIdTeacher2} />
            </View>
            <View style={thesis.text_input}>
                <Text style={login.text}>Giảng viên hướng dẫn 2 </Text>

                <GetCom getTecher={getIdCommittee} />
            </View>
            {/* <View style={thesis.text_input}>
                <Text style={login.text}>Danh sách hội đồng</Text>

                // <GetCom getTecher={getIdCommittee} />
            </View> */}
            <View style={[thesis.text_input]}>
                <TouchableOpacity onPress={addNewThesis}>
                    <Text style={login.button}
                    >THÊM KHÓA LUẬN MỚI</Text>
                </TouchableOpacity>

            </View>
        </View >



    )
}

export default AddThesis