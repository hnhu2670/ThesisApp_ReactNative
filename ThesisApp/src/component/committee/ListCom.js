import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import { AntDesign } from '@expo/vector-icons';
import Search from '../layout/Search';
import color from '../../assets/js/color';
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import { Popup } from 'react-native-popup-confirm-toast'
import hoidong from './style';
import ToastifyMessage from '../layout/ToastifyMessage';
import list_thesis from '../thesis/style_list';


const ListCom = ({ navigation }) => {
    const [show, setShow] = useState(false)
    const [committees, setCommittees] = useState([]);
    const [filter, setFilter] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(null)
    const [lazy, setLazy] = useState(false)
    const [nameComm, setNameComm] = useState('')
    const getCommittees = async (pageNumber) => {
        try {
            setLazy(true)
            const { data } = await axios.get(endpoints['list-committes'](pageNumber));
            setPage(pageNumber)
            // console.log('trabf', pageNumber)
            // console.log("ds hội đồng", data.results);
            setCommittees((prevPostSurveyList) => [...prevPostSurveyList, ...data.results]);
            setPageSize(data.count)
            setLazy(false)
            return data.results
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };


    const goToDetail = async (id, name) => {
        // console.log('data-------------------', id, name)
        const item = committees.find(item => item.id === id);
        if (item) {
            if (item.status.name !== 'Open') {
                console.log('Hội đồng bị khóa', item.status.name);
                setShow(true);
            } else {
                console.log('Hội đồng được mở', item.status.name);
                navigation.navigate("Cập nhật hội đồng", { id, name })
            }
        }
    }
    const changeName = async (id, name) => {
        console.log('data2-------------------', id, name)
        const item = committees.find(item => item.id === id);
        if (item) {
            if (item.status.name !== 'Open') {
                console.log('Hội đồng bị khóa', item.status.name);
                setShow(true);
            } else {
                console.log('Hội đồng được mở', item.status.name);
                navigation.navigate("Tên hội đồng", { id, name })
            }
        }
    }
    // const BodyComponent = ({ name, onChange }) => {
    //     return (
    //         <View>
    //             <TextInput
    //                 style={{ borderWidth: 1, borderColor: 'gray' }}
    //                 value={name}
    //                 onChangeText={onChange}
    //             />
    //         </View>
    //     );
    // }

    // const updateName = async (id, name) => {
    //     const popup = Popup;
    //     popup.show({
    //         type: 'confirm',
    //         textBody: 'hello',
    //         bodyComponent: (bodyProps) => (
    //             <BodyComponent
    //                 name={name}
    //                 onChange={(e) => name = e.target.value}
    //                 {...bodyProps}
    //             />
    //         ),
    //         confirmText: 'Cancel',
    //         iconEnabled: false,
    //         buttonEnabled: false,
    //     });


    //     async function changeName() {
    //         const token = await AsyncStorage.getItem('token')
    //         const formData = new FormData()
    //         for (let field in nameComm) {
    //             formData.append(field, nameComm[field]);
    //             // console.log(nameComm[field])
    //         }
    //         try {
    //             Popup.hide();
    //             const data = authApiToken(token).patch(endpoints['update-name-committes'](id), formData, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data"
    //                 }
    //             })
    //             console.log('update tên thành công', (await data).data)



    //         } catch (error) {
    //             console.log('lỗi nhe', error)
    //         }
    //     }
    // }
    const renderData = ({ item, index }) => {
        return (
            <>
                <View key={item.id} >
                    <View style={hoidong.row}>
                        <Text style={[hoidong.first,]}>
                            {index + 1}
                        </Text>
                        <TouchableOpacity style={[hoidong.name]}
                            onPress={() => changeName(item.id, item.name)}>
                            <Text style={{ color: color.green, fontSize: 16 }}>{item.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => goToDetail(item.id, item.name)}
                            style={[hoidong.edit]}
                        >
                            <Text>
                                <AntDesign color="gray" name="edit" size={25} />
                            </Text>
                        </TouchableOpacity>
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
            const hasMoreData = committees.length > 0 && committees.length < pageSize;

            if (hasMoreData) {
                const nextPage = page + 1;
                // lấy data từ page tiếp theo
                getCommittees(nextPage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCommittees(1);
        if (show !== false) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
        // console.log(show)
    }, [show]); //nếu truyền committee thì sẽ lặp quài, không truyền thì sẽ không cập nhật được giá trị

    return (
        <View style={[styles.container,]}>
            <View style={hoidong.contain_top}>
                <Text style={{
                    marginVertical: 10,
                    color: 'gray',
                    fontStyle: 'italic'
                }}>Lựa chọn hội đồng mà bạn cần cập nhật thông tin !!!</Text>
                <Search onSearch={searchName} />
            </View>
            <View style={hoidong.contain_bottom}>
                {committees.length < 1 ? (
                    <ActivityIndicator size={30} color={color.green} />
                ) : (
                    <>
                        <FlatList onScroll={handleScroll} scrollEventThrottle={16}
                            data={filter.length > 0 ? filter : committees}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderData}
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
            {show == true && (
                <ToastifyMessage
                    type="warning"
                    text='Hội đồng đã được khóa'
                    description="Hội đồng đã được khóa"
                />
            )}
        </View>

    );
};

export default ListCom;