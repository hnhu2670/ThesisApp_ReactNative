import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import styles from './style'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import GetCom from './GetCom'
import login from '../../login/style'
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown'

const UpdateThesis = ({ route }) => {
    const { id } = route.params;
    const [thesis, setThesis] = useState('')
    const [student, setStudent] = useState(null)
    const [teacher1, setTeacher1] = useState(null)
    const [teacher2, setTeacher2] = useState(null)
    const [comm, setComm] = useState(null)

    const [infor, setInfor] = useState('')
    const getIdStudent = (data) => {
        var id_student = ''
        data.map(s => {
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
        // console.log("id của thesis", id)
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        formData.append("committee", comm)
        formData.append("sinhvien", student)
        formData.append("giangvien1", teacher1)
        formData.append("giangvien2", teacher2)
        formData.append("name", thesis)

        // console.log("dữ liệu:---------", formData)
        try {
            const { data } = await axios.get(endpoints["get-thesis"](id))
            // console.log("data-----------", data)
            setInfor(data)
        } catch (error) {
            console.log("lỗi..............", error.request.responseText)
        }
    }
    useEffect(() => {
        // addNewThesis()
    }, [])
    return (
        <View >
            <Text>{id}</Text>
            <View style={[styles.text_input]}>
                <TextInput
                    style={[login.input, { fontSize: 16, textAlign: "center" }]}
                    placeholder='Tên khóa luận'
                    value={infor.committee}
                    onChangeText={text => setThesis(text)}
                />
            </View>
            <View style={styles.text_input}>
                <GetStudent getIdStudents={getIdStudent}
                // value={infor.id}
                />
            </View>
            <View style={styles.text_input}>
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
                    //     data={
                    //         label: `${infor.first_name} ${teacher.last_name}`,
                    // id: `${teacher.id}`
                    //     }
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                // value={selectedTeacher} // Giá trị được lưu
                // onChange={(item) => {

                //     sendIdTeacher(item); // Gọi hàm sendIdTeacher với giá trị id
                // }}
                // renderItem={renderItem}
                />
            </View>
            {/* <View style={styles.text_input}>
                <GetTeacher getTecher={getIdTeacher2} />
            </View>
            <View style={styles.text_input}>
                <GetCom getTecher={getIdCommittee} />
            </View> */}
            <View style={[styles.text_input]}>
                <TouchableOpacity onPress={addNewThesis}>
                    <Text style={login.button}
                    >THÊM KHÓA LUẬN MỚI</Text>
                </TouchableOpacity>

            </View>
        </View>




    )
}

export default UpdateThesis