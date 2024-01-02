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
    const [name, setName] = useState('')
    const [student, setStudent] = useState(null)
    const [teachers, setTeachers] = useState(null)
    const [listStudents, setListStudents] = useState([])

    const [changeGv1, setChangeGv1] = useState('')
    const [changeGv2, setChangeGv2] = useState('')
    const [changeComm, setChangeComm] = useState('')
    const [data1, setData1] = useState([
        { label: 'khong co', value: '1' }

    ])
    const [data2, setData2] = useState([
        { label: 'khong co', value: '1' }

    ])
    const [data3, setData3] = useState([
        { label: 'khong co', value: '1' }

    ])

    const [getDefault1, setGetDefault1] = useState(null)
    const [getDefault2, setGetDefault2] = useState(null)
    const [getDefault3, setGetDefault3] = useState(null)

    const [infor, setInfor] = useState("")
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
    const getCommittee = async () => {
        try {
            const { data } = await axios.get(endpoints["get-thesis"](id))
            const res = await axios.get(endpoints["list-committes"]);

            listgv = res.data
            listgv.forEach(element => {
                setData3(pre =>
                    [...pre, { value: element.id, label: `${element.name}` }]
                )
                if (data.committee != undefined) {
                    if (element.id == data.committee.id) {
                        setGetDefault3(element.id)
                    }
                }

            });
        } catch (error) {
            console.log("lỗi commmmmmm..............", error)
        }
    }
    const defaultSelet3 = (itemValue) => {
        setGetDefault3(itemValue)
        console.log(value)
    }

    const getGv1 = async () => {
        const token = await AsyncStorage.getItem('token')
        try {
            const { data } = await axios.get(endpoints["get-thesis"](id))
            setInfor(data)

            const res = await authApiToken(token).get("http://172.16.17.198:8000/get-users/?role=lecturer");
            setTeachers(res);
            listgv = res.data

            listgv.forEach(element => {
                setData1(pre =>
                    [...pre, { value: element.id, label: `${element.first_name} ${element.last_name}` }]
                )
                if (data.supervisors[0] != undefined) {
                    if (element.id == data.supervisors[0].user.id) {
                        setGetDefault1(element.id)
                    }
                }
            });


        } catch (error) {
            console.log("lỗi gv1..............", error)
        }
    }

    const defaultSelet1 = (itemValue) => {
        setGetDefault1(itemValue)
    }
    const getGv2 = async () => {
        const token = await AsyncStorage.getItem('token')
        try {
            const { data } = await axios.get(endpoints["get-thesis"](id))

            const res = await authApiToken(token).get("http://172.16.17.198:8000/get-users/?role=lecturer");
            setTeachers(res);

            listgv = res.data

            listgv.forEach(element => {

                setData2(pre =>
                    [...pre, { value: element.id, label: `${element.first_name} ${element.last_name}` }]
                )

                if (data.supervisors[1] != undefined) {
                    if (element.id == data.supervisors[1].user.id) {
                        setGetDefault2(element.id)
                    }
                }

            });
        } catch (error) {
            console.log("lỗi gv2..............", error)
        }
    }
    const defaultSelet2 = (itemValue) => {
        setGetDefault2(itemValue)
        console.log(value)
    }

    const getInfor = async () => {
        const { data } = await axios.get(endpoints["get-thesis"](id))
        setInfor(data)
        setListStudents(data.students)
    }

    const change = async () => {
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        formData.append("giangvien1", changeGv1.value)
        formData.append("giangvien2", changeGv2.value)
        formData.append("sinhvien", student)
        formData.append("committee", changeComm.value)
        console.log("form data", formData)

        try {
            const { data } = await authApiToken(token).patch(`http://172.16.17.198:8000/update-thesis/${id}/`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.log(data)
        } catch (error) {
            console.log("lỗi rồi nhe bạn ơi", error)
        }

    }
    const chageMultipleSelect = (values) => {
        var id_student = ''
        values.map(s => {
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
    useEffect(() => {
        getCommittee()
        getGv1()
        getGv2()
        getInfor()
    }, [])
    return (
        <View >
            <Text>{id}</Text>
            <View style={styles.text_input}>
                <Text>
                    Danh sách sinh viên đã thực hiện khóa luận:
                    {listStudents.length > 0 ? <>
                        {
                            listStudents.map(s => {
                                return (<Text>
                                    {s.user.first_name + " " + s.user.last_name}
                                </Text>)
                            })}
                    </> : <>
                        RỖNG
                    </>}


                </Text>
            </View>
            <View style={styles.text_input}>
                <GetStudent getIdStudents={getIdStudent}
                    setSelected={chageMultipleSelect}
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
                    valueField="value" // Trường giá trị hiển thị
                    data={data1}
                    value={getDefault1}
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet1}
                    onChange={(item) => {
                        setChangeGv1(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
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
                    valueField="value" // Trường giá trị hiển thị
                    data={data2}
                    value={getDefault2}
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet2}
                    onChange={(item) => {
                        setChangeGv2(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
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
                    valueField="value" // Trường giá trị hiển thị
                    data={data3}
                    value={getDefault3}
                    placeholder="Chọn hội đồng"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet3}
                    onChange={(item) => {
                        setChangeComm(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>

            <View style={[styles.text_input]}>
                <TouchableOpacity onPress={change}>
                    <Text style={login.button}
                    >THÊM KHÓA LUẬN MỚI</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default UpdateThesis