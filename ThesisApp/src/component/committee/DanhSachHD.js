import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';
import Search from '../layout/Search';
import color from '../../assets/js/color';
import styles from '../../assets/js/style';
import { MyUserContext } from '../../../App';
import ToastifyMessage from '../layout/ToastifyMessage';
import hoidong from './style';
import { AntDesign, Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DanhSachHD = ({ navigation }) => {
    const [show, setShow] = useState(false)
    const [current_user, dispatch] = useContext(MyUserContext);
    const [committees, setCommittees] = useState([]);
    const [filter, setFilter] = useState([])
    const getCommittees = async () => {
        try {
            const { data } = await axios.get(endpoints['list-committes']);
            // console.log('danh sách hội đồng', data[0])
            setCommittees(data);
            return data
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };
    const goToDetail = async (id, name) => {

        navigation.navigate("Chi tiết hội đồng", { id, name })

    }
    const goToDelete = async (id, name) => {
        const data = await getCommittees()
        // console.log('số lượng', data.length)
        console.log('id', id)
        data.map((item) => {
            // console.log('item', item.id)
            if (item?.id === id) {
                console.log('item', item.id)
                // console.log(data[id]?.status?.name);
                if (item?.status?.name !== 'Open')
                    // console.log('hội đồng bị khóa', item?.status?.name);
                    // alert('Hội đồng bị khóa ')
                    setShow(true)
                else {
                    console.log('hội đồng được mở', item?.status?.name);
                    navigation.navigate("Xóa thành viên", { id, name });
                }
            }
        });

    }
    const searchName = (text) => {
        const filterName = committees.filter((item) =>
            // toLowerCase() chuyển chữ hoa thành thường
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        console.log('Search text:', text);

    };
    const renderData = ({ item, index }) => {
        return (
            <>
                {current_user.role === 'student' || current_user.role === 'lecturer' ? <>
                    <TouchableOpacity style={hoidong.row} key={item.id}
                        onPress={() => goToDetail(item.id, item.name)}
                    >
                        <Text style={[hoidong.first]}>
                            {index + 1}
                        </Text>
                        <Text style={[hoidong.second]}>{item.name}</Text>

                    </TouchableOpacity>
                </> : <>
                    <View key={item.id}>
                        <TouchableOpacity onPress={() => goToDelete(item.id, item.name)} style={hoidong.row}>
                            <Text style={[hoidong.first]}>
                                {index + 1}
                            </Text>
                            <Text style={[hoidong.name]}>{item.name}</Text>
                            <View style={[hoidong.edit]}>
                                <Entypo name='remove-user' color={color.green} size={20} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </>}

            </>)
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
    }, [show]);

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

                    <FlatList
                        // data={committees}
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

// const hoidong = StyleSheet.create({

//     top: {
//         height: 'auto',
//         marginBottom: '3%'
//     },
//     bottom: {
//         height: windowHeight * 0.7,
//         marginVertical: '3%'
//     },

//     row: {
//         flexDirection: "row",
//         width: '100%',
//         height: 'auto',
//         // justifyContent: "space-around",
//         borderRadius: 15,
//         // paddingVertical: 15,
//         borderColor: color.green,
//         borderWidth: 1,
//         backgroundColor: color.lightgreen,
//         marginTop: 10,
//         marginBottom: 10,
//         alignItems: "center",
//         shadowColor: 'black',
//         shadowOpacity: 0.7,
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowRadius: 6,
//         elevation: 5,
//     },
//     first: {
//         // backgroundColor: "green",
//         textAlign: "center",
//         borderRightWidth: 1,
//         borderRightColor: 'lightgray',
//         marginLeft: 10,
//         width: '20%',
//         color: color.green,
//         paddingVertical: 20,
//         fontSize: 16

//     },
//     second: {
//         width: '75%',
//         color: color.green,
//         paddingVertical: 20,
//         fontSize: 16,
//         marginLeft: 20

//     },
//     edit: {
//         textAlign: "center",
//         padding: 10
//     }

// })
export default DanhSachHD;