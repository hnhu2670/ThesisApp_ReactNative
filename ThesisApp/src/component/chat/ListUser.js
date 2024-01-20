import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native';
import { authApiToken, endpoints } from '../../configs/Apis';
import mess from './style';
import Search from '../layout/Search';

const ListUser = () => {
    const [listTeacher, setListTeacher] = useState([])
    const [filter, setFilter] = useState([])

    const getTeachers = async () => {
        const token = await AsyncStorage.getItem('token')

        try {
            const { data } = await authApiToken(token).get(endpoints['get-user-role'] + '?role=lecturer');
            setListTeacher(data);
            // console.log("thông tin", data)
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    const searchName = (text) => {
        const filterName = listTeacher.filter((item) =>
            // toLowerCase() chuyển chữ hoa thành thường
            item?.username?.toLowerCase().includes(text.toLowerCase()) ||
            item?.last_name?.toLowerCase().includes(text.toLowerCase()) ||
            item?.first_name?.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        // console.log('Search text:', text);

    };
    useEffect(() => {
        getTeachers()
    }, [])
    return (
        <View>
            <Search onSearch={searchName} />
            <ScrollView style={[mess.container]}>
                {listTeacher.length < 1 ? (
                    <Text>Chưa có dữ liệu</Text>
                ) : (
                    filter.length > 0 ? (

                        filter.map(c => {
                            // { console.log(filter) }
                            return (
                                <View key={c.id} style={[mess.item]}>
                                    <View style={[mess.formImage]}>
                                        <Image style={[mess.image]}
                                            source={{ uri: c?.avatar_url }}

                                        />
                                    </View>
                                    <View>
                                        <Text style={[mess.userName]}>{c.username}</Text>
                                        <Text style={[mess.fullName]}>{c.last_name} {c.first_name}</Text>
                                    </View>

                                </View>
                            )
                        }

                        )) : (
                        listTeacher.map(c => {
                            // console.log(filter)
                            return (
                                <View key={c.id} style={[mess.item]}>
                                    <View style={[mess.formImage]}>
                                        <Image style={[mess.image]}
                                            source={{ uri: c?.avatar_url }}

                                        />
                                    </View>
                                    <View>
                                        <Text style={[mess.userName]}>{c.username}</Text>
                                        <Text style={[mess.fullName]}>{c.last_name} {c.first_name}</Text>
                                    </View>

                                </View>
                            )
                        }

                        )
                    ))
                }
            </ScrollView>
        </View>

    )
}

export default ListUser