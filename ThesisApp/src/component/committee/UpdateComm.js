import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import login from '../../login/style';
import styles from '../thesis/style';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropComponent from '../../dropdown/DropComponent';
const UpdateComm = ({ route, navigation }) => {
    const { id } = route.params; //id truyền từ trang danh sách qua
    // chủ tịch
    const [data1, setData1] = useState([])
    // thư ký
    const [data2, setData2] = useState([])
    //phản biện
    const [data3, setData3] = useState([])
    // tv1
    const [data4, setData4] = useState([])
    // tv2
    const [data5, setData5] = useState([])

    const [dataNew, setDataNew] = useState([])
    const [getDefault1, setGetDefault1] = useState(null)
    const [getDefault2, setGetDefault2] = useState(null)
    const [getDefault3, setGetDefault3] = useState(null)
    const [getDefault4, setGetDefault4] = useState(null)
    const [getDefault5, setGetDefault5] = useState(null)

    const [change1, setChange1] = useState([])
    const [change2, setChange2] = useState([])
    const [change3, setChange3] = useState([])
    const [change4, setChange4] = useState([])
    const [change5, setChange5] = useState([])

    const [thisComm, setThisComm] = useState([])
    const updateCommittee = async () => {
        const token = await AsyncStorage.getItem('token')

        const formData = new FormData()
        formData.append('committee', id)
        formData.append('member1', change1.value || getDefault1.value)
        formData.append('member2', change2.value || getDefault2.value)
        formData.append('member3', change3.value || getDefault3.value)
        formData.append('member4', change4.value || getDefault4.value)
        formData.append('member5', change5.value || getDefault5.value)
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
            setTimeout(() => {
                navigation.navigate('ThesisApp')
            }, 1000)
        } catch (error) {
            console.log("updateCommittee lỗi rồi", error)
        }
    }


    const getThisComm = async () => {
        try {
            const { data } = await axios.get(`${endpoints['get-member']}?committee=${id}`);
            // console.log("data", data)
            setThisComm(data)
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
    // kiểm tra chức vụ
    const checkMember = async () => {
        let data = await getTeacher()//callback gọi lại hàm lấy ds gv
        let memb = await getThisComm()
        var count = 0

        data.map(c => {
            setDataNew(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
        })
        for (let i = 0; i < memb.length; i++) {
            switch (memb[i]?.position.id) {
                case 1: console.log('chủ tịch--- ', i)
                    data.map(c => {
                        setData1(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                        if (c.id === memb[i]?.user.id) {
                            setGetDefault1(c.id)
                        }
                    })

                    break;
                case 2: console.log('thư ký --- ', i)
                    data.map(c => {
                        setData2(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                        if (c.id === memb[i]?.user.id) {
                            setGetDefault2(c.id)
                        }
                    })
                    break;
                case 3: console.log('phản biện --- ', i)
                    data.map(c => {
                        setData3(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                        if (c.id === memb[i]?.user.id) {
                            setGetDefault3(c.id)
                        }
                    })
                    break;

                case 4:
                    count++ //đếm lần xuất hiện của id 4
                    console.log('----------số thành viên', count)
                    if (count === 1) {
                        data.map(c => {
                            setData4(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                            if (c.id === memb[i]?.user.id) {
                                console.log('thành viên 1 --- ', i)
                                setGetDefault4(c.id)
                            }
                        })
                    }
                    else {
                        data.map(c => {

                            setData5(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                            if (c.id === memb[i]?.user.id) {
                                console.log('thành viên 2 --- ', i)
                                setGetDefault5(c.id)
                            }
                        })
                    }
                    break;
                case 5: console.log('thành viên 2 ---- ', i)
                    data.map(c => {
                        setData5(pre => [...pre, { value: c.id, label: `${c.first_name} ${c.last_name}` }])
                        if (c.id === memb[i]?.user.id) {
                            setGetDefault5(c.id)
                        }
                    })
                default: console.log('chọn thành viên mới đi', i)

            }
        }
    }
    const defaultSelet = (itemValue) => {
        setGetDefault1(itemValue)
        setGetDefault2(itemValue)
        setGetDefault3(itemValue)
        setGetDefault4(itemValue)
        setGetDefault5(itemValue)
    }
    useEffect(() => {
        getThisComm()
        getTeacher()
        checkMember()
        console.log('-------------------------------')
    }, [])
    return (
        <View>
            {/* hội đồng */}
            <View style={styles.text_input}>
                <Text style={login.text}>Tên hội đồng:</Text>
                <Text style={[login.text,
                {
                    fontSize: 25, textAlign: 'center', fontStyle: 'italic',
                    marginRight: 25, padding: 10, borderBottomWidth: 1, borderColor: 'lightgray'
                }]}>
                    {thisComm[0]?.Committee.name}</Text>
            </View>
            {/* chủ tịch */}
            <View style={styles.text_input}>
                <Text style={login.text}>Chủ tịch </Text>
                {thisComm[0]?.position.id === 1 ? <>
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
                </> : <>
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
                        data={dataNew}
                        value={getDefault5}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        onSelect={defaultSelet}
                        onChange={(item) => {
                            setChange1(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </>}
            </View>
            {/* thư ký */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thư ký </Text>
                {thisComm[1]?.position.id === 2 || thisComm[0]?.position.id === 2 ? <>
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
                </> : <>
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
                        data={dataNew}
                        value={getDefault5}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        onSelect={defaultSelet}
                        onChange={(item) => {
                            setChange2(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </>}

            </View>
            {/* phản biện */}
            <View style={styles.text_input}>
                <Text style={login.text}>Phản biện </Text>
                {thisComm[1]?.position.id === 3 || thisComm[0]?.position.id === 3 ||
                    thisComm[2]?.position.id === 3 ? <>
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
                </> : <>
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
                        data={dataNew}
                        value={getDefault5}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        onSelect={defaultSelet}
                        onChange={(item) => {
                            setChange3(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </>}

            </View>
            {/* tv1 */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thành viên 1 </Text>
                {thisComm[1]?.position.id === 4 || thisComm[0]?.position.id === 4 ||
                    thisComm[2]?.position.id === 4 || thisComm[3]?.position.id === 4 ? <>
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
                </> : <>
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
                        data={dataNew}
                        value={getDefault5}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        onSelect={defaultSelet}
                        onChange={(item) => {
                            setChange4(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </>}
            </View>
            {/* tv2 */}
            <View style={styles.text_input}>
                <Text style={login.text}>Thành viên 2</Text>
                {thisComm[1]?.position.id === 4 || thisComm[0]?.position.id === 4 ||
                    thisComm[2]?.position.id === 4 || thisComm[3]?.position.id === 4 ||
                    thisComm[4]?.position.id === 4 ? <>
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
                </> : <>
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
                        data={dataNew}
                        value={getDefault5}
                        placeholder="Chọn giảng viên"
                        searchPlaceholder="Tìm tên giảng viên..."
                        onSelect={defaultSelet}
                        onChange={(item) => {
                            setChange5(item); // Gọi hàm sendIdTeacher với giá trị id
                        }}
                    />
                </>
                }

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