import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from "./style"

const GetTeacher = () => {
    const [teacher, setTeacher] = useState([])
    const [value, setValue] = useState(null);
    const getTeacher = async () => {
        try {
            const res = await axios.get(endpoints['get-user-role'] + '?role=lecturer')
            console.log("hàm get user:", res.data.length);
            const result = await res.data;
            setTeacher(result);
        } catch (error) {
            console.log("lỗi đây nè", error)
        }
    }
    const renderItem = item => {
        console.log(item, value)
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.username}</Text>
                {item.username === value && (
                    <AntDesign
                        style={styles.icon}
                        name="checkcircleo" size={24} color="black" />
                )}
            </View>
        );
    };
    useEffect(() => {
        getTeacher()
    }, [])
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}//định dạng ô tìm kiếm
            iconStyle={styles.iconStyle}//định dạng icon
            search //ô tìm kiếm
            maxHeight={300}
            labelField="username" //tên hiển thị
            valueField="id"
            data={teacher} //dữ liệu hiển thị
            placeholder="Giảng viên hướng dẫn"
            searchPlaceholder="Tìm tên giảng viên..."
            value={teacher} //giá trị hiển thị
            // lấy giá trị của ô được chọn gán lên trên
            onChange={item => {
                setValue(item.username);
            }}
            renderItem={renderItem}
        />
    )
}

export default GetTeacher
