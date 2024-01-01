import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoints } from '../../configs/Apis';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './style';
import { Text } from 'react-native';
import { View } from 'react-native';

const GetCom = (props) => {
    const [committee, setCommittee] = useState([])
    const [selectedCommittee, setSelectedCommittee] = useState('');

    const sendIdCommittee = (item) => {
        console.log("Danh sách data", item.id);
        setSelectedCommittee(item.id); // Lưu giá trị id vào selectedTeacher
        console.log(".................", item.id)
        props.getTecher(item.id)
    }

    const getCommittee = async () => {
        // const token = await AsyncStorage.getItem('token')
        try {
            const { data } = await axios.get("http://172.16.17.198:8000/get-committee/");
            console.log("dataaaaaaa", data[1].name)
            setCommittee(data)
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {/* {item.id === committee && (
                    <AntDesign style={styles.icon} name="checkcircleo" size={24} color="black" />
                )} */}
            </View>
        );
    };


    useEffect(() => {
        getCommittee();
    }, []);

    return (
        // <Text>quá mợt</Text>
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
            data={committee?.map((c) => ({
                label: `${c.name}`,
                id: `${c.id}`
            }))}
            placeholder="Danh sách hội đồng"
            searchPlaceholder="Tìm hội đồng..."
            value={selectedCommittee} // Giá trị được lưu
            onChange={(item) => {
                sendIdCommittee(item); // Gọi hàm sendIdTeacher với giá trị id
            }}
            renderItem={renderItem}
        />
    )
}

export default GetCom