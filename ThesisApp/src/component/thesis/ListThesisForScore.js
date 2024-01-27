import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        // console.log('danh sách khóa luận được chấm điểm', res.data.length)
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
        nav.navigate('Chấm điểm', { id })
    }
    const renderItem = ({ item }) => {
        return (
            <>
                <View key={item.id}>
                    <View style={list_thesis.row}>
                        <View style={list_thesis.left}>
                            <Text style={list_thesis.text}>{item.id}</Text>
                        </View>

                        <TouchableOpacity onPress={() => goToScore(item.id)} style={list_thesis.right}>
                            <Text style={list_thesis.name}>{item.name}</Text>
                            <Text style={list_thesis.edit}>
                                <AntDesign color="#2d665f" name="right" size={20} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </>
        );
    }
    useEffect(() => {
        getListThesis();
    }, [])
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: '80%' }]}>
            <View style={list_thesis.container}>
                <View style={list_thesis.top}>
                    <Text style={{
                        marginVertical: 10,
                        color: 'gray',
                        fontStyle: 'italic'
                    }}>Lựa chọn khóa luận mà bạn cần chấm điểm !!!</Text>
                    <Search onSearch={searchName} />
                </View>
                <View style={list_thesis.bottom}>
                    {list.length < 1 ? (
                        // <Text>Chưa có dữ liệu</Text>
                        <ActivityIndicator size={30} color={color.green} />
                    ) : (<FlatList
                        data={filter.length > 0 ? filter : list}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                    )}
                </View>

            </View>

        </View>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const list_thesis = StyleSheet.create({
    container: {
        margin: 10,
    },
    top: {
        height: 'auto',
        marginBottom: '3%',
        // marginHorizontal: 20
    },
    bottom: {
        height: windowHeight * 0.7,
        marginVertical: '3%'
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 0.85,
    },
    right: {
        flexDirection: 'row',
        width: '90%',
        height: 'auto',
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
        width: "13%",
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