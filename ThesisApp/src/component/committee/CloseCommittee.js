import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis';
import styles from '../../assets/js/style';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Popup } from 'react-native-popup-confirm-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hoidong from './style';
import ToastifyMessage from '../layout/ToastifyMessage';

const CloseCommittee = () => {
    const [show, setShow] = useState('')
    const [messager, setMessager] = useState('')
    const [committees, setCommittees] = useState([]);
    const [close, setClose] = useState(false)
    const [selected, setSelected] = useState(false)
    // const [filter, setFilter] = useState([])
    const getCommittees = async () => {
        try {
            const { data } = await axios.get(endpoints['list-committes']);
            // console.log("ds hội đồng", data);
            setCommittees(data);
            return data
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
            const data = await getCommittees()
            data.map(async (item) => {
                if (item?.id === id) {
                    // kiểm tra trạng thái của hội đồng
                    // 1: Hội đồng đã khóa ==> xuất thông báo
                    if (item?.status?.name !== 'Open') {
                        Popup.hide();
                        setShow('warning')
                        setMessager('Hội đồng đã được khóa')
                    }
                    else {
                        // 2: hội đồng chưa khóa ==> gọi hàm khóa hội đồng
                        await closeCommittee()

                    }
                }
            });
        }
        async function closeCommittee() {
            const token = await AsyncStorage.getItem('token')
            try {
                Popup.hide();
                try {
                    const data = await authApiToken(token).patch(endpoints['close-committes'](id));
                    console.log("khóa hội đồng thành công", data.status);
                    setClose(true)
                    setSelected(id)
                    setShow('success')
                    setMessager('Khóa hội đồng thành công')
                } catch (error) {
                    console.log("Lỗi rồi trang listcom", error.message);
                    setClose(false)
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

    useEffect(() => {
        getCommittees()
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 1500);
            return () => clearTimeout(timer);
        }
        // console.log(show)
    }, [show])
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: '80%' }]}>
            <View style={hoidong.container}>
                <View style={hoidong.top}>
                    <Text style={{
                        marginVertical: 10,
                        color: 'gray',
                        fontStyle: 'italic'
                    }}>Lựa chọn hội đồng mà bạn muốn khóa !!!</Text>
                    {/* <Search onSearch={searchName} /> */}
                </View>
                <View style={hoidong.bottom}>
                    {committees.length < 1 ? (
                        // <Text>Chưa có dữ liệu</Text>
                        <ActivityIndicator size={30} color={color.green} />
                    ) : (
                        committees.map(item =>
                            <View key={item.id} >
                                <View style={hoidong.row}>
                                    <Text style={[hoidong.first]}>
                                        {item.id}
                                    </Text>

                                    <Text style={[hoidong.name]}>{item.name}</Text>
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
                        )

                    )}
                </View>

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
    )
}

export default CloseCommittee