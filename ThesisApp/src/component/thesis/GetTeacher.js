import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from "./style"
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const getTeachers = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const { data } = await authApiToken(token).get(endpoints['get-user-role'] + '?role=lecturer');
            setTeachers(data);
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{`${item.first_name} ${item.last_name}`}</Text>
                {`${item.first_name} ${item.last_name}` === selectedTeacher && (
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
            data={teachers.map((teacher) => ({
                label: `${teacher.first_name} ${teacher.last_name}`,
            }))}
            placeholder="Giảng viên hướng dẫn"
            searchPlaceholder="Tìm tên giảng viên..."
            value={selectedTeacher} //hien len sau khi chon
            onChange={(item) => setSelectedTeacher(`${item.first_name} ${item.last_name}`)}
            renderItem={renderItem}
        />
    );
};

export default GetTeacher;