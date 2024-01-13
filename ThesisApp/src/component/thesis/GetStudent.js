import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { authApiToken, endpoints } from '../../configs/Apis';
import { ScrollView } from 'react-native-gesture-handler';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStudent = (props) => {
    const [students, setStudent] = useState([])
    const [selected, setSelected] = useState([]);

    const sendIdStudent = (id) => {

        // console.log("Danh sách data", id);
        // setSelected(item.id); // Lưu giá trị id vào selectedTeacher
        // console.log(".................", item.id)
        // console.log('22222')
        props.getIdStudents(id)
        // console.log('22222')
    }
    const getStudent = async () => {
        const token = await AsyncStorage.getItem('token')
        // console.log("token", token)
        try {
            const { data } = await authApiToken(token).get(endpoints['get-user-role'] + '?role=student')
            const result = await data;
            // console.log("result", result)

            setStudent(result);

        } catch (error) {
            console.log("lỗi đây nè", error)
        }
    }
    const chageMultipleSelect = (values) => {
        setSelected(values);
        // console.log('ngộ ha', selected)

        // sendIdStudent(values)
        // console.log(selected)
    };
    useEffect(() => {
        getStudent()
        // console.log(selected);
        // sendIdStudent(item)
    }, [])

    return (
        <View >
            <View style={{ width: '92%' }}>
                <MultipleSelectList
                    setSelected={chageMultipleSelect}
                    data={students.map((student) => ({
                        key: `${student.id}`,
                        value: `${student.first_name} ${student.last_name}`, // Hiển thị nhãn
                    }))}
                    // defaultValue={selected}
                    onSelect={() => sendIdStudent(selected)} //set id ở đây
                    save='key'
                    label='Danh sách sinh viên'
                />
            </View>

        </View>
    );
};

export default GetStudent;
