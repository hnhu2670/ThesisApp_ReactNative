import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import { AntDesign, Entypo, MaterialCommunityIcons, Octicons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import profile from '../user/style';
import styles from '../../assets/js/style';
import thesis from '../thesis/style';
import Header from '../layout/Header';
import { MyUserContext } from '../../../App';


const Committee = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);

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

            {current_user.role === 'admin' || current_user.role === 'universityadministrator' ? <>
                <TouchableOpacity style={thesis.items} onPress={() => { navigation.navigate("Danh sách hội đồng") }}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <Entypo color={color.green} name="list" size={30} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Cập Nhật Hội Đồng</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={thesis.items} onPress={() => { navigation.navigate("Thêm hội đồng") }}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <Octicons name="diff-added" size={30} color={color.green} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Thêm Khóa Hội Đồng Mới</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </> : <>
                {current_user.role === 'lecturer' ? <>
                    <TouchableOpacity style={thesis.items} onPress={() => { navigation.navigate("Danh sách hội đồng") }}>
                        <View style={thesis.list}>
                            <View style={thesis.mini_icon}>
                                <Entypo color={color.green} name="list" size={30} />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center' }}>
                                <Text style={thesis.tile}>Danh Sách Hội Đồng</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={thesis.items} >
                        <View style={thesis.list}>
                            <View style={thesis.mini_icon}>
                                <Ionicons color={color.green} name="people" size={30} />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center' }}>
                                <Text style={thesis.tile}>Hội Đồng Của Tôi</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </> : <>
                    <TouchableOpacity style={thesis.items} onPress={() => { navigation.navigate("Danh sách hội đồng") }}>
                        <View style={thesis.list}>
                            <View style={thesis.mini_icon}>
                                <Entypo color={color.green} name="list" size={30} />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center' }}>
                                <Text style={thesis.tile}>Danh Sách Hội Đồng</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </>}

            </>}
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