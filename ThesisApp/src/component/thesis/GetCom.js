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
        setSelectedCommittee(item.id); // Lưu giá trị id vào selectedTeacher
        props.getTecher(item.id)
    }

    const getCommittee = async () => {
        try {
            const { data } = await axios.get(endpoints["list-committes"]);
            setCommittee(data)
        } catch (error) {
            console.log("Lỗi trang getcom:", error);
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