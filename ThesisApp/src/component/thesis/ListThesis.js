import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'

const ListThesis = ({ navigation }) => {
    const [list, setList] = useState('')

    const getListThesis = async () => {
        const res = await axios.get(endpoints["list-thesis"])

        if (res.status === 200) {
            const result = await res.data;
            setList(result);

        } else {
            throw new Error(res.statusText);
        }
    }
    const goToDetail = (id) => {
        navigation.navigate("Cập nhật khóa luận", { id })
    }
    const renderItem = ({ item }) => {
        return (
            <>
                <View key={item.id} style={list_thesis.coll}>
                    <View style={list_thesis.row}>
                        <View style={list_thesis.left}>
                            <Text style={list_thesis.text}>{item.id}</Text>
                        </View>

                        <View style={{ width: "85%" }}>
                            <TouchableOpacity onPress={() => goToDetail(item.id)}>
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
    }, []);
    return (
        <View >
            {list.length < 1 ? (
                <Text>Chưa có dữ liệu</Text>
            ) : (<FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            )}
        </View>
    )

}
const list_thesis = StyleSheet.create({
    // container: {
    //     margin: 10,
    // },
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
            height: 5,
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
export default ListThesis