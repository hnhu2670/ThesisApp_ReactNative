import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import Search from '../layout/Search'
import color from '../../assets/js/color'
import styles from '../../assets/js/style'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DanhSachKL = () => {
    const [list, setList] = useState('')
    const [filter, setFilter] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(null)
    const getListThesis = async (pageNumber) => {
        const { data } = await axios.get(endpoints["list-thesis"](pageNumber))
        setPage(pageNumber)
        setList((prevPostSurveyList) => [...prevPostSurveyList, ...data.results]);
        setPageSize(data.count)
        return data.results

    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={list_thesis.row} key={item.id}>
                <View style={list_thesis.left}>
                    <Text style={list_thesis.text}>{index + 1}</Text>
                </View>
                <View style={list_thesis.right}>
                    <Text style={list_thesis.name}>{item.name}</Text>
                </View>
            </View>
        )
    }

    // tìm kiếm
    const searchName = (text) => {
        const filterName = list.filter((item) =>
            // toLowerCase() chuyển chữ hoa thành thường
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        console.log('Search text:', text);

    };
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
                getListThesis(nextPage);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListThesis(1);
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: color.background }]}>
            <View style={list_thesis.top}>
                <Text style={{
                    marginVertical: 10,
                    color: 'gray',
                    fontStyle: 'italic'
                }}>Danh sách tất cả khóa luận !!!</Text>
                {/* onSearch truyền từ search qua */}
                <Search onSearch={searchName} />
            </View>
            <View style={list_thesis.bottom}>
                {list.length < 1 ? (
                    // <Text>Chưa có dữ liệu</Text>
                    <ActivityIndicator size={30} color={color.green} />
                ) : (<FlatList onScroll={handleScroll} scrollEventThrottle={16}
                    data={filter.length > 0 ? filter : list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                )}
            </View>
        </View>

    )

}
const list_thesis = StyleSheet.create({
    // container: {
    //     margin: 10,
    // },
    top: {
        height: 'auto',
        marginBottom: '3%'
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
    },
    right: {
        flexDirection: "row",
        width: windowWidth * 0.8,
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
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    left: {
        width: windowWidth * 0.1,
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
        height: 'auto',
        color: "#2d665f",
        // color: "black",
        fontSize: 16
    },
    edit: {
        textAlign: "right",
        justifyContent: "center",
    }
})
export default DanhSachKL