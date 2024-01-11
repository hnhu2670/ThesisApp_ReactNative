import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'
import Search from '../layout/Search'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'

const ListThesis = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);

    const [list, setList] = useState('')
    const [filter, setFilter] = useState([])
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
                {current_user.role === 'admin' || current_user.role === 'universityadministrator' ? <>
                    <View key={item.id} style={list_thesis.coll}>
                        <View style={list_thesis.row}>
                            <View style={list_thesis.left}>
                                <Text style={list_thesis.text}>{item.id}</Text>
                            </View>

                            <View style={{ width: "92%" }}>
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
                </> : <>
                    <View key={item.id} style={list_thesis.coll}>
                        <View style={list_thesis.row}>
                            <View style={list_thesis.left}>
                                <Text style={list_thesis.text}>{item.id}</Text>
                            </View>

                            <View style={{ width: "92%" }}>
                                <View style={list_thesis.right}>
                                    <Text style={list_thesis.name}>{item.name}</Text>
                                </View>
                            </View>


                        </View>
                    </View>
                </>}

            </>
        );
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
    useEffect(() => {
        getListThesis();
    }, []);
    return (
        <View style={{ backgroundColor: color.background, height: '100%' }}>
            <View style={list_thesis.container}>
                <View style={list_thesis.top}>
                    <Search onSearch={searchName} />
                </View>
                <View style={list_thesis.bottom}>
                    {list.length < 1 ? (
                        <Text>Chưa có dữ liệu</Text>
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
const list_thesis = StyleSheet.create({
    container: {
        margin: 10,
    },
    top: {
        height: '10%',
        marginVertical: '2%',
        // marginHorizontal: 20
    },
    bottom: {
        height: '100%'
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