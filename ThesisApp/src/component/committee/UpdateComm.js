import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import login from '../../login/style';
import styles from '../thesis/style';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateComm = ({ route }) => {
    const { id } = route.params; //id truyền từ trang danh sách qua
    const [data, setData] = useState([
        { label: 'khong co', value: '1' }
    ])
    // chủ tịch
    const [data1, setData1] = useState([
        { label: 'khong co', value: '1' }

    ])
    // thư ký
    const [data2, setData2] = useState([
        { label: 'khong co', value: '1' }

    ])
    //phản biện
    const [data3, setData3] = useState([
        { label: 'khong co', value: '1' }

    ])
    // tv1
    const [data4, setData4] = useState([
        { label: 'khong co', value: '1' }

    ])
    // tv2
    const [data5, setData5] = useState([
        { label: 'khong co', value: '1' }

    ])
    const [getDefault, setGetDefault] = useState(null)
    const [getDefault1, setGetDefault1] = useState(null)
    const [getDefault2, setGetDefault2] = useState(null)
    const [getDefault3, setGetDefault3] = useState(null)
    const [getDefault4, setGetDefault4] = useState(null)
    const [getDefault5, setGetDefault5] = useState(null)

    const [change, setChange] = useState([])
    const [change1, setChange1] = useState([])
    const [change2, setChange2] = useState([])
    const [change3, setChange3] = useState([])
    const [change4, setChange4] = useState([])
    const [change5, setChange5] = useState([])

    const updateCommittee = async () => {
        const token = await AsyncStorage.getItem('token')

        const formData = new FormData()
        formData.append('committee', change.value)
        console.log(change)
        formData.append('member1', change1.value)
        formData.append('member2', change2.value)
        formData.append('member3', change3.value)
        formData.append('member4', change4.value)
        formData.append('member5', change5.value)
        formData.append('position1', '1')
        formData.append('position2', '2')
        formData.append('position3', '3')
        formData.append('position4', '4')
        formData.append('position5', '4')
        console.log('dữ liệu lấy được', formData)

        try {
            const { data } = await authApiToken(token).patch(endpoints['update-committes'](id), formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            // console.log()
            console.log("duwx liệu thêm thành công", data)
        } catch (error) {
            console.log("updateCommittee lỗi rồi", error)
        }
    }


    const getThisComm = async () => {
        try {
            const { data } = await axios.get(`${endpoints['get-member']}?committee=${id}`);
            // console.log("data", data)
            return data

        } catch (error) {
            console.log("lỗi getThisComm", error)
        }
    }


    const getTeacher = async () => {
        const token = await AsyncStorage.getItem('token')

        const { data } = await authApiToken(token).get(endpoints['get-user-role'] + '?role=lecturer');
        return data
    }
    // hội đồng
    const nameCommittee = async () => {
        let { data } = await axios.get(endpoints['list-committes']);
        // console.log(data)
        let memb = await getThisComm()  // thông tin hội đồng
        data?.map(c => {
            setData(pre =>
                [...pre, { value: c.id, label: c.name }]

            )

            if (memb[0].Committee.id !== undefined) {
                if (c.id === memb[0].user.id) {

                    setGetDefault(c.id)

                }
            }
        })
    }
    // chủ tịch
    const getPresident = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()  // thông tin hội đồng
        data?.map(c => {

            setData1(pre =>
                [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }]

            )
            // console.log('-----------------', data1)
            // so sánh vị trí memb[0].position.id
            // sktra có chọn chưa
            if (memb[0].user.id !== undefined) {
                console.log('-----------------', c.id)
                if (c.id === memb[0].user.id) {

                    setGetDefault1(c.id)

                }
            }
        })
    }
    // thư ký
    const getSecretary = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()
        data?.map(c => {
            //thư ký

            setData2(pre =>
                [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }]
            )
            if (memb[1].user.id != undefined) {
                if (c.id == memb[1]?.user.id) {
                    setGetDefault2(c.id)
                }
            }
        })
    }
    // phản biện
    const getLecturer = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()
        data?.map(c => {
            // phản biện

            setData3(pre =>
                [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }]
            )
            if (memb[2]?.user.id !== undefined) {
                if (c.id == memb[2]?.user.id) {
                    setGetDefault3(c.id)
                }
            }
        })
    }
    // tv1
    const getMember1 = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()
        data?.map(c => {
            // tv1

            setData4(pre =>
                [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }]
            )
            if (memb[3]?.user.id !== undefined) {
                if (c.id == memb[3]?.user.id) {
                    setGetDefault4(c.id)
                }
            }
        })
    }
    // tv2
    const getMember2 = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()
        data.map(c => {

            setData5(pre =>
                [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }]
            )
            if (memb[4]?.user.id !== undefined) {
                if (c.id == memb[4]?.user.id) {
                    setGetDefault5(c.id)
                }
            }
        })
    }

    const defaultSelet = (itemValue) => {
        setGetDefault(itemValue)
        setGetDefault1(itemValue)
        setGetDefault2(itemValue)
        setGetDefault3(itemValue)
        setGetDefault4(itemValue)
        setGetDefault5(itemValue)
    }
    useEffect(() => {
        getThisComm()
        getTeacher()
        nameCommittee()
        getPresident()
        getSecretary()
        getLecturer()
        getMember1()
        getMember2()
        // console.log("data", getDefault1)

    }, [])
    return (
        <View>
            {/* hội đồng */}
            <View style={styles.text_input}>
                <Text style={login.text}>Danh sách hội đồng </Text>
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
                    data={data}
                    value={getDefault}
                    placeholder="Chọn hội đồng"
                    searchPlaceholder="Tìm tên hội đồng..."
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            {/* chủ tịch */}
            <View style={styles.text_input}>
                <Text style={login.text}>Chủ tịch </Text>
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
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange1(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            {/* thư ký */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thư ký </Text>
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
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange2(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            {/* phản biện */}
            <View style={styles.text_input}>
                <Text style={login.text}>Giảng viên phản biện</Text>
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
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange3(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            {/* tv1 */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thành viên 1</Text>
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
                    data={data4}
                    value={getDefault4}
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange4(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            {/* tv2 */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thành viên 2</Text>
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
                    data={data5}
                    value={getDefault5}
                    placeholder="Chọn giảng viên"
                    searchPlaceholder="Tìm tên giảng viên..."
                    onSelect={defaultSelet}
                    onChange={(item) => {
                        setChange5(item); // Gọi hàm sendIdTeacher với giá trị id
                    }}
                />
            </View>
            <View style={[login.text_input, { marginBottom: 20 }]}>
                <TouchableOpacity onPress={updateCommittee}>
                    <Text style={login.button}
                    >CẬP NHẬT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateComm