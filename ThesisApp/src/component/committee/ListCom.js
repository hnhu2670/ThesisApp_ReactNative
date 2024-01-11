import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import { AntDesign } from '@expo/vector-icons';
import Search from '../layout/Search';
import color from '../../assets/js/color';
import { MyUserContext } from '../../../App';


const ListCom = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [committees, setCommittees] = useState([]);
    const [filter, setFilter] = useState([])
    const getCommittees = async () => {
        try {
            const { data } = await axios.get(endpoints['list-committes']);
            // console.log("ds hội đồng", data.length);
            setCommittees(data);
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };

    const goToDetail = (id) => {
        navigation.navigate("Cập nhật hội đồng", { id })
    }
    const renderData = ({ item }) => {
        return (
            <>
                {current_user.role === 'admin' || current_user.role === 'universityadministrator' ? <>
                    <View key={item.id} >
                        <View style={hoidong.row}>
                            <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>
                                {item.id}
                            </Text>
                            <Text style={[hoidong.cell, { width: "65%" }]}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => goToDetail(item.id)}
                                style={[hoidong.cell, hoidong.edit, { width: "15%" }]}
                            >
                                <Text>
                                    <AntDesign color="gray" name="edit" size={25} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </> : <>
                    <View key={item.id} >
                        <View style={hoidong.row}>
                            <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>
                                {item.id}
                            </Text>
                            <Text style={[hoidong.cell, { width: "65%" }]}>{item.name}</Text>
                        </View>

                    </View>
                </>

                }
            </>


        );
    };
    const searchName = (text) => {
        const filterName = committees.filter((item) =>
            // toLowerCase() chuyển chữ hoa thành thường
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        console.log('Search text:', text);

    };
    useEffect(() => {
        getCommittees();
    }, []);

    return (
        <View style={{ backgroundColor: color.lightgreen, height: '100%' }}>
            <View style={hoidong.container}>
                <View style={hoidong.top}>
                    <Search onSearch={searchName} />
                </View>
                <View style={hoidong.bottom}>
                    {committees.length < 1 ? (
                        <Text>Chưa có dữ liệu</Text>
                    ) : (

                        <FlatList
                            // data={committees}
                            data={filter.length > 0 ? filter : committees}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderData}
                        />
                    )}
                </View>

            </View>
        </View>

    );
};

const hoidong = StyleSheet.create({
    container: {
        margin: 10,
        // backgroundColor: color.lightgreen,
    },
    top: {
        height: '10%',
        marginVertical: '2%'
    },
    bottom: {
        height: '100%'
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
export default ListCom;