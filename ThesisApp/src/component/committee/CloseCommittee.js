import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis';
import styles from '../../assets/js/style';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hoidong from './style';
import ToastifyMessage from '../layout/ToastifyMessage';
import Search from '../layout/Search';
const CloseCommittee = () => {
    const [show, setShow] = useState('')
    const [messager, setMessager] = useState('')
    const [filter, setFilter] = useState([])

    const [committees, setCommittees] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(null)
    const getCommittees = async (pageNumber) => {
        try {
            const { data } = await axios.get(endpoints['list-committes'](pageNumber));
            setPage(pageNumber)
            // nối dữ liệu của page 1 và page 2 ....
            // prevPostSurveyList: mãng hiện tại
            //...data.results: dữ liệu tiếp theo
            setCommittees((prevPostSurveyList) => [...prevPostSurveyList, ...data.results]);
            setPageSize(data.count)
            return data.results
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };

    const closeComm = async (id, name) => {

        Popup.show({
            type: 'confirm',
            title: 'Khóa hội đồng',
            textBody: `Bạn có muốn khóa hội đồng "${name}" này không ??`,
            buttonText: 'Ok',
            confirmText: 'Cancel',

            // click ok
            callback: checkClose,
            cancelCallback: () => {
                Popup.hide();//tắt confirm
            },
        });
        async function checkClose() {
            const item = committees.find(item => item.id === id);
            if (item) {
                // kiểm tra trạng thái của hội đồng
                //  1: Hội đồng đã khóa ==> xuất thông báo
                if (item.status.name !== 'Open') {
                    Popup.hide();
                    setShow('warning')
                    setMessager('Hội đồng đã được khóa')
                } else {
                    // 2: hội đồng chưa khóa ==> gọi hàm khóa hội đồng
                    console.log('Hội đồng mở', item.status.name);
                    await closeCommittee()
                }
            }

        }
        async function closeCommittee() {

            const token = await AsyncStorage.getItem('token')
            try {
                Popup.hide();
                try {
                    const data = await authApiToken(token).patch(endpoints['close-committes'](id));
                    console.log("khóa hội đồng thành công", data.status);
                    // Cập nhật dữ liệu mới vào state committees
                    const updatedCommittees = committees.map(item => {
                        if (item.id === id) {
                            // Cập nhật trạng thái của hội đồng đã khóa
                            return {
                                // gán giá trị hiện tạo vào item
                                ...item,
                                // thay đổi status
                                status: {
                                    ...item.status,
                                    name: 'Closed'
                                }
                            };
                        }
                        return item;
                    });
                    // lưu mới vào setCommittees
                    setCommittees(updatedCommittees);
                    setShow('success')
                    setMessager('Khóa hội đồng thành công')
                } catch (error) {
                    console.log("Lỗi rồi trang listcom", error.message);

                    setShow('error')
                    setMessager('Khóa hội đồng thất bại')
                }
            } catch (error) {
                console.error('Lỗi khi khóa hội đồng', error);
                setShow('error')
                setMessager('Khóa hội đồng thất bại')

            }
        }

    }

    const renderData = ({ item, index }) => {
        return (
            <>
                <View key={item.id} >
                    <View style={hoidong.row}>
                        <Text style={[hoidong.first,]}>
                            {item.id}
                        </Text>
                        <View style={[hoidong.name]}>
                            <Text style={{ color: color.green, fontSize: 16 }}>{item.name}</Text>
                        </View>
                        {/* hội đồng được khóa */}
                        {item.status.name !== 'Open' ? <>
                            <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
                                style={[hoidong.edit]}
                            >
                                <Text>
                                    <Entypo color="gray" name="lock" size={20} />
                                </Text>
                            </TouchableOpacity>
                        </> : <>
                            {/* hội đồng chưa khóa */}
                            <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
                                style={[hoidong.edit]}
                            >
                                <Text>
                                    <Entypo color="gray" name="lock-open" size={20} />
                                </Text>
                            </TouchableOpacity>
                        </>}
                    </View>

                </View>

            </>


        );
    };
    const searchName = (text) => {
        const filterName = committees.filter((item) =>
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
        const isEndOfScrollView = contentOffset.y >= (contentSize.height - layoutMeasurement.height - 1);
        if (!isEndOfScrollView) return;
        try {
            const hasMoreData = committees.length > 0 && committees.length < pageSize;
            if (hasMoreData) {
                const nextPage = page + 1;
                getCommittees(nextPage);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getCommittees(1)
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 1500);
            return () => clearTimeout(timer);
        }
        // console.log(show)
    }, [show])

    return (
        <View style={[styles.container, { backgroundColor: color.background }]}>
            <View style={hoidong.contain_top}>
                <Text style={{
                    marginVertical: 10,
                    color: 'gray',
                    fontStyle: 'italic'
                }}>Xem thông tin tất cả hội đồng !!!</Text>
                <Search onSearch={searchName} />
            </View>
            <View style={hoidong.contain_bottom}>
                {committees.length < 1 ? (
                    // <Text>Chưa có dữ liệu</Text>
                    <ActivityIndicator size={30} color={color.green} />
                ) : (

                    <FlatList onScroll={handleScroll} scrollEventThrottle={16}
                        // data={committees}
                        data={filter.length > 0 ? filter : committees}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderData}
                    />
                )}
            </View>
            {show == 'warning' && (
                <ToastifyMessage
                    type="warning"
                    text={messager}
                    description="Hội đồng đã được khóa"
                />
            )}
            {show == 'success' && (
                <ToastifyMessage
                    type="success"
                    text={messager}
                    description="Hội đồng đã được khóa"
                />
            )}
            {show == 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={messager}
                    description="Hội đồng chưa được khóa"
                />
            )}
        </View>
        // <View style={[styles.container, { backgroundColor: color.background }]}>
        //     <View style={hoidong.container}>
        //         <View style={hoidong.top}>
        //             <Text style={{
        //                 marginVertical: 10,
        //                 color: 'gray',
        //                 fontStyle: 'italic'
        //             }}>Lựa chọn hội đồng mà bạn muốn khóa !!!</Text>
        //             <Search onSearch={searchName} />
        //         </View>
        //         <View style={hoidong.contain_bottom}>
        //             {committees.length < 1 ? (
        //                 // <Text>Chưa có dữ liệu</Text>
        //                 <ActivityIndicator size={30} color={color.green} />
        //             ) : (

        //                 <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        //                     {committees.map((item =>
        //                         <View key={item.id} >
        //                             <View style={hoidong.row}>
        //                                 <Text style={[hoidong.first,]}>
        //                                     {item.id}
        //                                 </Text>
        //                                 <View style={[hoidong.name]}
        //                                     onPress={() => changeName(item.id, item.name)}>
        //                                     <Text style={{ color: color.green, fontSize: 16 }}>{item.name}</Text>
        //                                 </View>
        //                                 {/* hội đồng được khóa */}
        //                                 {item.status.name !== 'Open' ? <>
        //                                     <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
        //                                         style={[hoidong.edit]}
        //                                     >
        //                                         <Text>
        //                                             <Entypo color="gray" name="lock" size={20} />
        //                                         </Text>
        //                                     </TouchableOpacity>
        //                                 </> : <>
        //                                     {/* hội đồng chưa khóa */}
        //                                     <TouchableOpacity onPress={() => closeComm(item.id, item.name)}
        //                                         style={[hoidong.edit]}
        //                                     >
        //                                         <Text>
        //                                             <Entypo color="gray" name="lock-open" size={20} />
        //                                         </Text>
        //                                     </TouchableOpacity>
        //                                 </>}
        //                             </View>

        //                         </View>
        //                     ))}
        //                 </ScrollView>
        //             )
        //             }
        //         </View>

        //     </View>
        //     {show == 'warning' && (
        //         <ToastifyMessage
        //             type="warning"
        //             text={messager}
        //             description="Hội đồng đã được khóa"
        //         />
        //     )}
        //     {show == 'success' && (
        //         <ToastifyMessage
        //             type="success"
        //             text={messager}
        //             description="Hội đồng đã được khóa"
        //         />
        //     )}
        //     {show == 'error' && (
        //         <ToastifyMessage
        //             type="danger"
        //             text={messager}
        //             description="Hội đồng chưa được khóa"
        //         />
        //     )}
        // </View>
    )
}

export default CloseCommittee