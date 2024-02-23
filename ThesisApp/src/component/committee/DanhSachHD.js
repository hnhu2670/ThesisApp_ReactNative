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
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(null)
    const getCommittees = async (pageNumber) => {
        try {

            const { data } = await axios.get(endpoints['list-committes'](pageNumber));
            setPage(pageNumber)
            console.log('trabf', pageNumber)
            console.log("ds hội đồng", data.results);
            setCommittees((prevPostSurveyList) => [...prevPostSurveyList, ...data.results]);
            setPageSize(data.count)
            // setPostSurveyList((prevPostSurveyList) => [...prevPostSurveyList, ...res.data.results]);
            return data.results
        } catch (error) {
            console.log("Lỗi rồi trang listcom", error.message);
        }
    };
    const goToDetail = async (id, name) => {

        navigation.navigate("Chi tiết hội đồng", { id, name })

    }
    const goToDelete = async (id, name) => {
        const item = committees.find(item => item.id === id);
        if (item) {
            if (item.status.name !== 'Open') {
                console.log('Hội đồng bị khóa', item.status.name);
                setShow(true);
            } else {
                console.log('Hội đồng được mở', item.status.name);
                navigation.navigate("Xóa thành viên", { id, name });
            }
        }

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
        getCommittees(1);
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

                    <FlatList onScroll={handleScroll} scrollEventThrottle={16}
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

export default DanhSachHD;