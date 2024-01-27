import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import { AntDesign } from '@expo/vector-icons';
import Search from '../layout/Search';
import color from '../../assets/js/color';
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import hoidong from './style';
import ToastifyMessage from '../layout/ToastifyMessage';


const ListCom = ({ navigation }) => {
    const [show, setShow] = useState(false)
    const [committees, setCommittees] = useState([]);
    const [filter, setFilter] = useState([])
    const getCommittees = async () => {
        try {
            const { data } = await axios.get(endpoints['list-committes']);
            // console.log("ds hội đồng", data);
            setCommittees(data);
            return (data)
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };

    const goToDetail = async (id) => {
        const data = await getCommittees()
        console.log('id', id)
        data.map((item) => {
            // console.log('item', item.id)
            if (item?.id === id) {
                console.log('item', item.id)
                // console.log(data[id]?.status?.name);
                if (item?.status?.name !== 'Open') {
                    console.log('hội đồng bị khóa', item?.status?.name);
                    // alert('Hội đồng bị khóa ')
                    setShow(true)
                }
                else {
                    console.log('hội đồng được mở', item?.status?.name);
                    navigation.navigate("Cập nhật hội đồng", { id })
                }
            }
        });

    }

    const changeName = async (id, name) => {
        const data = await getCommittees()
        console.log('id', id)
        data.map((item) => {
            // console.log('item', item.id)
            if (item?.id === id) {
                console.log('item', item.id)
                // console.log(data[id]?.status?.name);
                if (item?.status?.name !== 'Open') {
                    console.log('hội đồng bị khóa', item?.status?.name);
                    // alert('Hội đồng bị khóa ')
                    setShow(true)
                }
                else {
                    console.log('hội đồng được mở', item?.status?.name);
                    navigation.navigate("Tên hội đồng", { id, name })

                }
            }
        });
    }

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
                            onPress={() => goToDetail(item.id)}
                            style={[hoidong.edit]}
                        >
                            <Text>
                                <AntDesign color="gray" name="edit" size={25} />
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* {current_user.role === 'admin' || current_user.role === 'universityadministrator' ? <>
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
                                onPress={() => goToDetail(item.id)}
                                style={[hoidong.edit]}
                            >
                                <Text>
                                    <AntDesign color="gray" name="edit" size={25} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </> : <>
                    <View key={item.id} >
                        <View style={hoidong.row}>
                            <Text style={[hoidong.cell, hoidong.first, { width: "15%" }]}>
                                {item.id}
                            </Text>
                            <Text style={[hoidong.cell, { width: "65%" }]}>{item.name}</Text>
                        </View>

                    </View>
                </>

                } */}
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

    useEffect(() => {
        getCommittees();
        if (show !== false) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
        console.log(show)
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

                    <FlatList
                        data={filter.length > 0 ? filter : committees}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderData}
                    />
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