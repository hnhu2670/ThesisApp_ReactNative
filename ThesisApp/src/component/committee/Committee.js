import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import profile from '../user/style';
import styles from '../../assets/js/style';
import thesis from '../thesis/style';
import Header from '../layout/Header';


const Committee = ({ navigation }) => {
    // const [committees, setCommittees] = useState([]);

    // const getCommittees = async () => {
    //     try {
    //         const { data } = await axios.get(endpoints['list-committes']);
    //         // console.log("ds hội đồng", data.length);
    //         setCommittees(data);
    //     } catch (error) {
    //         console.log("Lỗi rồi", error);
    //     }
    // };

    // const goToDetail = (id) => {
    //     navigation.navigate("Chi tiết", { id })
    // }
    // const renderItem = () => {
    //     return (
    //         <>
    //             {committees.length < 1 ? (
    //                 <Text>Chưa có dữ liệu</Text>
    //             ) : (
    //                 committees.map(c =>

    //                     <View key={c.id} style={hoidong.coll}>
    //                         <View style={hoidong.row}>
    //                             <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>{c.id}</Text>
    //                             <Text style={[hoidong.cell, { width: '65%' }]}>{c.name}</Text>
    //                             <TouchableOpacity onPress={() => goToDetail(c.id)}
    //                                 style={[hoidong.cell, hoidong.edit, { width: '15%' }]}>
    //                                 <Text >
    //                                     <AntDesign color="gray" name="edit" size={25} />
    //                                 </Text>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </View>
    //                 )
    //             )}
    //         </>
    //     );
    // }
    // useEffect(() => {
    //     getCommittees();
    //     // renderItem()
    // }, []);

    return (
        <View style={[styles.container, thesis.contain]}>
            <Header />
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'left',
                    width: '100%',
                    fontStyle: 'italic',
                    marginBottom: '10%',
                    color: color.green
                }}
            >Hội đồng bảo vệ khóa luận</Text>
            <View style={thesis.top_thesis}>
                <View style={thesis.top_items}>
                    <TouchableOpacity style={thesis.mini_item} onPress={() => { navigation.navigate("Thêm hội đồng") }}
                    >
                        <View>
                            <View style={thesis.mini_icon}>
                                <MaterialCommunityIcons color="gray" name="update" size={35} />
                            </View>
                            <Text
                                style={[styles.font, profile.link]}>Thêm hội đồng
                            </Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={thesis.mini_item} onPress={() => { navigation.navigate("Danh sách hội đồng") }}
                    >
                        <View>
                            <View style={thesis.mini_icon}>
                                <Octicons color="gray" name="diff-added" size={35} />
                            </View>
                            <Text
                                style={[styles.font, profile.link]}>Danh sách hội đồng
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
};

const hoidong = StyleSheet.create({
    container: {
        margin: 10,
    },
    // headers: {
    //     flexDirection: 'row',
    //     height: 50,
    //     width: "100%",
    //     padding: 10
    // },
    // heading: {
    //     flex: 1,
    //     textAlign: "center",
    //     justifyContent: "space-around",
    //     backgroundColor: "green",
    //     padding: 10,
    //     height: "auto",

    // },
    row: {
        flexDirection: "row",
        width: "100%",
        height: 80,
        justifyContent: "space-around",
        borderRadius: 15,
        backgroundColor: "lightblue",
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
    },
    first: {
        backgroundColor: "green",
        textAlign: "center",
        borderRadius: 10,
        marginLeft: 10
    },
    edit: {
        textAlign: "center",
        padding: 10
    }

})
export default Committee;