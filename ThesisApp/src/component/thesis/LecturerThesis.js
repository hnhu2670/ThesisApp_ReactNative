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
        try {
            const token = await AsyncStorage.getItem('token')
            const { data } = await authApiToken(token).get(endpoints['thesis-of-lecturer'])
            console.log('thông tin user', data)
            setThisThesis(data)
        } catch (error) {
            console.log('lỗi getThisThesis', error)
        }

    }
    const goAddMark = (id, name) => {
        navigation.navigate("Chấm điểm", { id, name })
    }
    useEffect(() => {
        getThisThesis()
    }, [])
    return (
        <View style={[styles.container]}>
            <Text style={[login.text, { color: 'red' }]}>Số lượng khóa luận cần chấm: {thisThesis.length}</Text>

            {thisThesis.length < 1 ? (
                <ActivityIndicator />
            ) : (
                thisThesis.map((c, index) =>
                    <View key={c.id} >
                        <TouchableOpacity onPress={() => goAddMark(c.id, c.name)} style={[hoidong.row]}>
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

export default LecturerThesis