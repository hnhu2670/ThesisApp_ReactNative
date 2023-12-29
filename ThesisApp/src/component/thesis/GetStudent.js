import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import styles from "./style"
import { AntDesign } from '@expo/vector-icons';
import { authApiToken, endpoints } from '../../configs/Apis';
import { ScrollView } from 'react-native-gesture-handler';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const GetStudent = () => {
    const [students, setStudent] = useState([])
    const [selected, setSelected] = useState([]);
    const getStudent = async () => {
        try {
            const { data } = await authApiToken().get(endpoints['get-user-role'] + '?role=student')
            const result = await data;
            // console.log("result", result)

            setStudent(result);

        } catch (error) {
            console.log("lỗi đây nè", error)
        }
    }
    const chageMultipleSelect = (values) => {
        setSelected(values);
    };
    useEffect(() => {
        getStudent()
        console.log(selected);

    }, [])

    return (
        <View style={styles.container}>
            <MultipleSelectList
                // luu giá trị được chọn
                setSelected={(val) => {
                    setSelected(val)
                    console.log(selected);
                }}
                data={students.map((student) => ({
                    value: ` ${student.first_name} ${student.last_name}`,
                    label: ` ${student.first_name} ${student.last_name}`,
                }))}
                save={['last_name', 'first_name']}
                label='Danh sách sinh viên'
            >
            </MultipleSelectList>

        </View>
    );
};

export default GetStudent;
