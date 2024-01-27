import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoints } from '../../configs/Apis';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const GetCom = (props) => {
    const [committee, setCommittee] = useState([])
    const [selectedCommittee, setSelectedCommittee] = useState('');

    const sendIdCommittee = (item) => {
        setSelectedCommittee(item.id); // Lưu giá trị id vào selectedTeacher
        props.getTecher(item.id)
    }

    const getCommittee = async () => {
        try {
            const { data } = await axios.get(endpoints["list-committes"] + '?status=Open');
            console.log('data', data)
            setCommittee(data)
        } catch (error) {
            console.log("Lỗi trang getcom:", error);
        }
    };
    const renderItem = (item) => {
        return (
            <View style={style.item}>
                <Text style={style.textItem}>{item.label}</Text>
                {item.id === selectedCommittee && (
                    <AntDesign style={style.icon} name="checkcircleo" size={24} color="black" />
                )}
            </View>
        );
    };


    useEffect(() => {
        getCommittee();
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
            data={committee?.map((c) => ({
                label: `${c.name}`,
                id: `${c.id}`
            }))}
            placeholder="Chọn giảng viên"
            searchPlaceholder="Tìm tên giảng viên..."
            value={selectedCommittee} // Giá trị được lưu
            onChange={(item) => {
                sendIdCommittee(item); // Gọi hàm sendIdTeacher với giá trị id
            }}
            renderItem={renderItem}
        />
    )
}
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
export default GetCom