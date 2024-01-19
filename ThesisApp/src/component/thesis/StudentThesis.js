import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiToken, endpoints } from '../../configs/Apis';
import axios from 'axios';
import styles from '../../assets/js/style';
import login from '../../login/style';
import hoidong from '../committee/style';
import color from '../../assets/js/color';

const StudentThesis = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    // console.log(current_user.id)
    const [thisThesis, setThesis] = useState([])
    const getThisThesis = async () => {
        // const token = await AsyncStorage.getItem('token')
        const { data } = await axios.get(endpoints['thesis-of-user'](current_user.id))
        // console.log('thông tin của sinh viên', data)
        setThesis(data)
    }
    const goToDetail = (id, name) => {
        navigation.navigate("Chi tiết khóa luận", { id, name })
    }
    useEffect(() => {
        getThisThesis()
    }, [])
    return (
        <View style={[styles.container]}>
            <Text style={[login.text]}>Số lượng khóa luận tham gia: {thisThesis.length}</Text>

            {thisThesis.length < 1 ? (
                <ActivityIndicator />
            ) : (
                thisThesis.map(c =>
                    <View style={hoidong.row} key={c.id}>
                        <Text style={[hoidong.cell, hoidong.first, { width: "20%" }]}>
                            Mã KL: {c.id}
                        </Text>
                        <TouchableOpacity onPress={() => { goToDetail(c.id, c.name) }}
                            style={[hoidong.cell,]}
                        >
                            <Text style={[hoidong.text]}>{c.name}</Text>
                        </TouchableOpacity>

                    </View>
                )
            )}
        </View>
    )
}

export default StudentThesis