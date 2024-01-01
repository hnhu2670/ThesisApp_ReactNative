import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'

const ListThesis = () => {
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
        navigation.navigate("Chi tiết", { id })
    }
    const renderItem = () => {
        return (
            <>
                {list.length < 1 ? (
                    <Text>Chưa có dữ liệu</Text>
                ) : (
                    list.map(c =>

                        <View key={c.id} style={list_thesis.coll}>
                            <View style={list_thesis.row}>
                                <View style={list_thesis.left}>
                                    <Text style={list_thesis.text}>{c.id}</Text>
                                </View>

                                <View style={list_thesis.right}>
                                    <Text style={list_thesis.name}>{c.name}</Text>
                                    <TouchableOpacity onPress={() => goToDetail(c.id)}>
                                        <Text style={list_thesis.edit}>
                                            <AntDesign color="#2d665f" name="right" size={20} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )
                )}
            </>
        );
    }
    useEffect(() => {
        getListThesis();
    }, []);
    return (
        <View style={list_thesis.container}>
            <FlatList
                data={list}
                keyExtractor={(item) => { item.id.toString() }}
                renderItem={renderItem}
            />
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
        width: "80%",
        height: 80,
        borderWidth: 1,
        borderColor: "#2d665f",
        padding: 20,
        borderRadius: 10
    },
    left: {
        width: "10%",
        height: 80,
        marginRight: 10
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
        fontSize: 16
    },
    edit: {
        textAlign: "right",
        justifyContent: "center",
        // padding: 10,
    }
    // cell: {
    //     height: "auto",
    //     padding: 10,
    //     textAlign: "left",
    //     fontSize: 16,
    // },
    // first: {
    //     backgroundColor: "#2d665f",
    //     color: "#ffff",
    //     textAlign: "center",
    //     // justifyContent: "center",
    //     borderRadius: 50,
    //     // marginLeft: 10,
    //     marginRight: 10,
    //     marginTop: -25,
    //     height: 40,
    //     width: 40,
    //     fontSize: 15,

    // },
    // second: {
    //     backgroundColor: "#2d665f",
    //     color: "#FFFF",
    //     height: 70,
    //     textAlignVertical: "center",
    //     alignItems: "center",
    //     padding: 10,
    //     paddingLeft: 20
    // },

})
export default ListThesis