import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis';
import styles from '../../assets/js/style';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CloseCommittee = () => {
    const [committees, setCommittees] = useState([]);
    const [close, setClose] = useState(false)
    const [selected, setSelected] = useState(false)
    const [filter, setFilter] = useState([])
    const getCommittees = async () => {
        try {
            const { data } = await axios.get(endpoints['list-committes']);
            // console.log("ds hội đồng", data);
            setCommittees(data);
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };

    const closeComm = async (id, name) => {

        Popup.show({
            type: 'confirm',
            title: 'Khóa hội đồng',
            textBody: `Bạn có muốn khóa hội đồng ${name} này không ??`,
            buttonText: 'Ok',
            confirmText: 'Cancel',

            // click ok
            callback: closeCommittee,
            cancelCallback: () => {
                Popup.hide();//tắt confirm
            },
        });
        async function closeCommittee() {
            const token = await AsyncStorage.getItem('token')
            try {
                Popup.hide();
                try {
                    const data = await authApiToken(token).patch(endpoints['close-committes'](id));
                    console.log("khóa hội đồng", data.status);
                    setClose(true)
                    setSelected(id)
                } catch (error) {
                    console.log("Lỗi rồi trang listcom", error.message);
                    setClose(false)
                }


            } catch (error) {
                // Xử lý khi xảy ra lỗi
                console.error('Lỗi khi khóa hội đồng', error);
                // setShow('error')
                // setMessager("Xóa thành viên thất bại")
            }
        }

    }
    // const renderData = ({ item }) => {
    //     return (
    //         <>
    //             <View key={item.id} >
    //                 <View style={hoidong.row}>
    //                     <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>
    //                         {item.id}
    //                     </Text>
    //                     <TouchableOpacity
    //                         style={[hoidong.cell, { width: "65%" }]}
    //                         onPress={() => changeName(item.id, item.name)}>
    //                         <Text >{item.name}</Text>
    //                     </TouchableOpacity>

    //                     <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
    //                         // onPress={() => goToDetail(item.id)}
    //                         style={[hoidong.cell, hoidong.edit, { width: "15%" }]}
    //                     >
    //                         <Text>
    //                             <Entypo color="gray" name="lock" size={20} />
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>

    //             </View>
    //         </>


    //     );
    // };
    useEffect(() => {
        getCommittees()
    }, [])
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: '80%' }]}>
            <View style={hoidong.container}>
                <View style={hoidong.top}>
                    <Text style={{
                        marginVertical: 10,
                        color: 'gray',
                        fontStyle: 'italic'
                    }}>Lựa chọn hội đồng mà bạn muốn khóa !!!</Text>
                    {/* <Search onSearch={searchName} /> */}
                </View>
                <View style={hoidong.bottom}>
                    {committees.length < 1 ? (
                        // <Text>Chưa có dữ liệu</Text>
                        <ActivityIndicator size={30} color={color.green} />
                    ) : (
                        committees.map(item =>
                            <View key={item.id} >
                                <View style={hoidong.row}>
                                    <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>
                                        {item.id}
                                    </Text>
                                    <View
                                        style={[hoidong.cell, { width: "65%" }]}>
                                        <Text >{item.name}</Text>
                                    </View>
                                    {close === true && selected === item.id ? <>
                                        <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
                                            style={[hoidong.cell, hoidong.edit, { width: "15%" }]}
                                        >
                                            <Text>
                                                <Entypo color="gray" name="lock" size={20} />
                                            </Text>
                                        </TouchableOpacity>
                                    </> : <>
                                        <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
                                            style={[hoidong.cell, hoidong.edit, { width: "15%" }]}
                                        >
                                            <Text>
                                                <Entypo color="gray" name="lock-open" size={20} />
                                            </Text>
                                        </TouchableOpacity>
                                    </>}
                                </View>
                            </View>
                        )

                    )}
                </View>

            </View>
        </View>
    )
}
const hoidong = StyleSheet.create({
    top: {
        height: 'auto',
        marginBottom: '3%',
        // marginHorizontal: 20
    },
    bottom: {
        height: '90%',
        marginVertical: '3%'
    },
    row: {
        flexDirection: "row",
        width: "100%",
        height: 80,
        justifyContent: "space-around",
        borderRadius: 15,
        borderColor: color.green,
        borderWidth: 1,
        backgroundColor: color.lightgreen,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: 'black', // Màu sắc của bóng
        shadowOpacity: 0.7, // Độ sắc nét của bóng (0-1)
        shadowOffset: {
            width: 0,
            height: 2,
        }, // Khoảng cách dịch chuyển theo chiều ngang và chiều dọc
        shadowRadius: 6, // Bán kính của bóng
        elevation: 5, // Áp dụng bóng (chỉ áp dụng cho Android)
    },
    cell: {
        height: "auto",
        padding: 10,
        textAlign: "left",
        fontSize: 16,
        color: color.green,
        // borderRightWidth: 2
    },
    first: {
        // backgroundColor: "green",
        textAlign: "center",
        borderRightWidth: 1,
        borderRightColor: 'lightgray',
        marginLeft: 10,

    },
    edit: {
        textAlign: "center",
        padding: 10
    }

})
export default CloseCommittee