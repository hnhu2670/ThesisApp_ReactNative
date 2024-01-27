import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { authApiToken, endpoints } from '../../configs/Apis'
import styles from '../../assets/js/style'
import { MyUserContext } from '../../../App'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import login from '../../login/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import hoidong from './style'

const MyCommittee = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext)
    const [thisComm, setThisComm] = useState([])
    console.log('id của gv', current_user.id)
    const getThisComm = async () => {
        const { data } = await axios.get(endpoints['committee-of-user'](current_user.id))
        console.log('thông tin user', data)
        setThisComm(data)
    }

    const goToDetail = (id, name) => {
        navigation.navigate("Chi tiết hội đồng", { id, name })
    }
    useEffect(() => {
        getThisComm()
    }, [])
    return (
        <View style={[styles.container]}>
            <Text style={[login.text, { color: 'red' }]}>Số lượng hội đồng tham gia: {thisComm.length}</Text>

            {thisComm.length < 1 ? (
                <ActivityIndicator />
            ) : (
                thisComm.map((c, index) =>
                    <View key={c.id} >
                        <TouchableOpacity onPress={() => goToDetail(c.id, c.name)} style={[hoidong.row]}>
                            <Text style={[hoidong.first]}>
                                {index + 1}
                            </Text>

                            <Text style={[hoidong.second]}>{c.name}</Text>
                        </TouchableOpacity>

                    </View>
                )
            )}
        </View>
    )
}

export default MyCommittee