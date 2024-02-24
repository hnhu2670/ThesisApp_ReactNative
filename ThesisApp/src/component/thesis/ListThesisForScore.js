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

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(null)
    const [lazy, setLazy] = useState(false)
    const getListThesis = async (pageNumber) => {
        setLazy(true)
        const { data } = await axios.get(endpoints["list-thesis"](pageNumber))
        setPage(pageNumber)

        setList((prevPostSurveyList) => [...prevPostSurveyList, ...data.results]);
        setPageSize(data.count)
        setLazy(false)
        return data.results

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
    const handleScroll = async (event) => {
        event.persist();
        const { layoutMeasurement, contentOffset, contentSize } = event?.nativeEvent || {};
        // layoutMeasurement(kthuoc hiện tại => nd được hiển thị) + contentOffset(vtri hiện tại) contentSize(kthuoc toàn bộ)
        //    cao của nội dung trừ chiều cao của vùng hiển thị
        const isEndOfScrollView = contentOffset.y >= (contentSize.height - layoutMeasurement.height - 1);

        // ktra đã scroll đến cuối chưa
        if (!isEndOfScrollView) return;
        try {
            // ktra còn data để load hong
            const hasMoreData = list.length > 0 && list.length < pageSize;

            if (hasMoreData) {
                const nextPage = page + 1;
                // lấy data từ page tiếp theo
                // setLazy(true)
                // console.log("1", lazy)
                getListThesis(nextPage);
                // setLazy(false)
                // console.log("2", lazy)
            }
        } catch (error) {
            // setLazy(true)
            console.error(error);
        }
    };
    useEffect(() => {
        getListThesis(1);
    }, []);
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
                <View style={list_thesis.bottom}>
                    {list.length < 1 ? (
                        <ActivityIndicator size={30} color={color.green} />

                    ) : (
                        <>
                            <FlatList
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                data={filter.length > 0 ? filter : list}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                            />
                            {lazy && (
                                <View style={list_thesis.lazy}>
                                    <ActivityIndicator size={30} color={color.green} />
                                    <Text style={{ fontSize: 16, color: color.green }}>Loading...</Text>
                                </View>
                            )}
                        </>
                    )}
                </View>
            </View>

        </View>
    )
}
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const list_thesis = StyleSheet.create({
//     container: {
//         margin: 10,
//     },
//     top: {
//         height: 'auto',
//         marginBottom: '3%',
//         // marginHorizontal: 20
//     },
//     bottom: {
//         height: windowHeight * 0.7,
//         marginVertical: '3%'
//     },
//     row: {
//         flexDirection: "row",
//         marginBottom: 10,
//         marginTop: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         width: windowWidth * 0.85,
//     },
//     right: {
//         flexDirection: 'row',
//         width: '90%',
//         height: 'auto',
//         borderWidth: 1,
//         borderColor: '#d0eacef5',
//         // backgroundColor: '#e1eee0e8',
//         backgroundColor: '#dde8dcfc',
//         padding: 20,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     left: {
//         width: "13%",
//         height: 80,
//         marginRight: -15,
//         position: 'relative',
//         zIndex: 99
//     },
//     text: {
//         height: 40,
//         width: 40,
//         borderRadius: 50,
//         backgroundColor: "#2d665f",
//         color: "#FFFF",
//         textAlign: "center",
//         textAlignVertical: "center",
//         padding: 10,

//     },
//     name: {
//         width: "90%",
//         color: "#2d665f",
//         // color: "black",
//         fontSize: 16
//     },
//     edit: {
//         textAlign: "right",
//         justifyContent: "center",
//     }
// })
export default ListThesisForScore;