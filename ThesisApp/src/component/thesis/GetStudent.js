import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import styles from "./style"
import { AntDesign } from '@expo/vector-icons';
import { endpoints } from '../../configs/Apis';
import { ScrollView } from 'react-native-gesture-handler';

const GetStudent = () => {
    const [student, setStudent] = useState([])
    const [selected, setSelected] = useState('');

    const getStudent = async () => {
        try {
            // const res = await axios.get("http://192.168.1.5:8000/get-users/?role=student")
            const res = await axios.get(endpoints['get-user-role'] + '?role=student')
            console.log("hàm get user:", res.data.length);
            const result = await res.data;
            setStudent(result);
        } catch (error) {
            console.log("lỗi đây nè", error)
        }
    }
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.username}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };

    const deleteItem = (itemToDelete) => {
        const updatedSelectedItems = selected.filter(item => item !== itemToDelete);
        console.log("đây là gì:", updatedSelectedItems)

    };

    useEffect(() => {
        getStudent()
        // deleteItem()
    }, [])

    return (
        <View style={styles.container}>

            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                labelField="username" //tên hiển thị
                valueField="id"
                data={student} //dữ liệu hiển thị
                placeholder="Sinh viên thực hiện"
                searchPlaceholder="Tìm tên sinh viên..."
                value={selected} //giá trị hiển thị
                search
                onChange={item => {
                    setSelected(item.username);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.username}</Text>
                            <AntDesign color="black" name="delete" size={17} onPress={() => deleteItem(item)} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default GetStudent;
