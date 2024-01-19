import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import hoidong from '../committee/style'
import styles from '../../assets/js/style'
import login from '../../login/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authApiToken, endpoints } from '../../configs/Apis'

const LecturerThesis = ({ navigation }) => {
    const [thisThesis, setThisThesis] = useState([])

    const getThisThesis = async () => {
        const token = await AsyncStorage.getItem('token')
        const { data } = await authApiToken(token).get(endpoints['thesis-of-lecturer'])
        console.log('thông tin user', data)
        setThisThesis(data)
    }
    const goAddMark = (id, name) => {
        navigation.navigate("Chấm Điểm", { id, name })
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
                        <TouchableOpacity onPress={() => goAddMark(c.id, c.name)}>
                            <Text style={[hoidong.cell, { width: "100%" }]}>{c.name}</Text>
                        </TouchableOpacity>

                    </View>
                )
            )}
        </View>
    )
}

export default LecturerThesis