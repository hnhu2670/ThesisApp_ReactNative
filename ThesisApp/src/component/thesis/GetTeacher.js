import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from "./style"
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thesis from './style';

const GetTeacher = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const sendIdTeacher = (item) => {

        // console.log("Danh sách data", item.id);
        setSelectedTeacher(item.id); // Lưu giá trị id vào selectedTeacher
        // console.log(".................", item.id)
        props.getTecher(item.id)
    }

    const getTeachers = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const { data } = await authApiToken(token).get(`${endpoints["get-user-role"]("all")}&role=lecturer`);
            setTeachers(data);
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    const renderItem = (item) => {
        return (
            <View style={style.item}>
                <Text style={style.textItem}>{item.label}</Text>
                {item.id === selectedTeacher && (
                    <AntDesign style={style.icon} name="checkcircleo" size={24} color="black" />
                )}
            </View>
        );
    };


    useEffect(() => {
        getTeachers();
    }, []);

    return (
        <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            iconStyle={style.iconStyle}
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

const style = StyleSheet.create({
    dropdown: {
        // marginTop: 10,
        marginRight: 30,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

})
export default GetTeacher;