import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from '../../assets/js/style'
import Search from '../layout/Search'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ListThesisForScore = () => {
    const [list, setList] = useState([])
    const [filter, setFilter] = useState([])

    const nav = useNavigation();

    const getListThesis = async () => {
        const token = await AsyncStorage.getItem('token')

        const res = await authApiToken(token).get(endpoints["list-thesis"])
        console.log('danh sách khóa luận được chấm điểm', res.data.length)
        if (res.status === 200) {
            const result = await res.data;
            setList(result);

        } else {
            throw new Error(res.statusText);
        }
    }
    const searchName = (text) => {
        const filterName = list.filter((item) =>
            // toLowerCase() chuyển chữ hoa thành thường
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        console.log('Search text:', text);

    };
    const goToScore = (id) => {
        nav.navigate('Chấm Điểm', { id })
    }
    const renderItem = ({ item }) => {
        return (
            <>
                <View key={item.id} style={list_thesis.coll}>
                    <View style={list_thesis.row}>
                        <View style={list_thesis.left}>
                            <Text style={list_thesis.text}>{item.id}</Text>
                        </View>

                        <View style={{ width: "95%" }}>
                            <TouchableOpacity onPress={() => goToScore(item.id)}>
                                <View style={list_thesis.right}>
                                    <Text style={list_thesis.name}>{item.name}</Text>
                                    <Text style={list_thesis.edit}>
                                        <AntDesign color="#2d665f" name="right" size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

            </>
        );
    }
    useEffect(() => {
        getListThesis();
    }, [])
    return (
        <View style={[{ backgroundColor: color.background, height: '75%', marginTop: '3%' }]}>
            <View style={list_thesis.top}>
                {/* onSearch truyền từ search qua */}
                <Search onSearch={searchName} />
            </View>
            <View style={list_thesis.container}>
                {list.length < 1 ? (
                    // <Text>Chưa có dữ liệu</Text>
                    <ActivityIndicator />
                ) : (<FlatList

                    data={filter.length > 0 ? filter : list} //kiểm tra dữ liệu có được tìm thấy không
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                )}
            </View>
        </View>
    )
}
const list_thesis = StyleSheet.create({
    container: {
        margin: 10,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    right: {
        flexDirection: "row",
        width: "100%",
        height: 85,
        borderWidth: 1,
        borderColor: '#d0eacef5',
        // backgroundColor: '#e1eee0e8',
        backgroundColor: '#dde8dcfc',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    left: {
        width: "10%",
        height: 80,
        marginRight: -15,
        position: 'relative',
        zIndex: 99
    },
    text: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: "#2d665f",
        color: "#FFFF",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 10,

    },
    name: {
        width: "90%",
        color: "#2d665f",
        // color: "black",
        fontSize: 16
    },
    edit: {
        textAlign: "right",
        justifyContent: "center",
    }
})
export default ListThesisForScore;