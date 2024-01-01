import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from "./style"
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetTeacher = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [value, setValue] = useState(null);

    const sendIdTeacher = (item) => {

        console.log("Danh sách data", item.id);
        setSelectedTeacher(item.id); // Lưu giá trị id vào selectedTeacher
        // console.log(".................", item.id)
        props.getTecher(item.id)
    }

    const getTeachers = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const { data } = await authApiToken(token).get(endpoints['get-user-role'] + '?role=lecturer');
            setTeachers(data);
            console.log(data[0])

        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.id === selectedTeacher && (
                    <AntDesign style={styles.icon} name="checkcircleo" size={24} color="black" />
                )}
            </View>
        );
    };


    useEffect(() => {
        getTeachers();
    }, []);

    return (
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
            data={teachers.map((teacher) => ({
                label: `${teacher.first_name} ${teacher.last_name}`,
                id: `${teacher.id}`
            }))}
            placeholder="Chọn giảng viên"
            searchPlaceholder="Tìm tên giảng viên..."
            value={selectedTeacher} // Giá trị được lưu
            onChange={(item) => {

                sendIdTeacher(item); // Gọi hàm sendIdTeacher với giá trị id
            }}
            renderItem={renderItem}
        />
    );
};

export default GetTeacher;