import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'
import Search from '../layout/Search'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'
import styles from '../../assets/js/style'
import list_thesis from './style_list'
import thesis from './style'
import { Popup } from 'react-native-popup-confirm-toast'

const ListThesis = ({ navigation }) => {

    const [list, setList] = useState('')
    const [filter, setFilter] = useState([])
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
    const update = async (id, name) => {
        navigation.navigate('Cập nhật khóa luận', { id, name })
    }
    // const changeName = (id, name) => {
    //     const popup = Popup;
    //     const [newName, setNewName] = useState(name);

    //     const handleInputChange = (text) => {
    //         setNewName(text);
    //     };

    //     popup.show({
    //         type: 'confirm',
    //         textBody: `Bạn có muốn xóa thành viên "${name}" này không?`,
    //         bodyComponent: (bodyProps) => (
    //             <TextInput
    //                 value={newName}
    //                 onChangeText={handleInputChange}
    //                 placeholder="Nhập tên mới"
    //             />
    //         ),
    //         confirmText: 'Cancel',
    //         iconEnabled: false,
    //         buttonEnabled: false,
    //     });
    // };



    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity key={item.id} onPress={() => { update(item.id, item.name) }}>
                    <View style={list_thesis.row}>
                        <View style={list_thesis.left}>
                            <Text style={list_thesis.text}>{item.id}</Text>
                        </View>
                        <View style={list_thesis.right}>
                            <Text style={list_thesis.name}>{item.name}</Text>
                        </View>


                    </View>
                </TouchableOpacity>

            </>
        );
    }
    const searchName = (text) => {
        const filterName = list.filter((item) =>
            // toLowerCase() chứ hoa thành thường
            item.name.toLowerCase().includes(text.trim().toLowerCase()));
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
        console.log('tên.......................', list)
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: '80%' }]}>
            <View style={list_thesis.container}>
                <View style={list_thesis.top}>
                    <Text style={{
                        marginVertical: 10,
                        color: 'gray',
                        fontStyle: 'italic'
                    }}>Thông tin khóa luận !!!</Text>
                    <Search onSearch={searchName} />
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

export default ListThesis