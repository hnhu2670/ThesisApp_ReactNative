import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import styles from '../../assets/js/style'
import login from '../../login/style'
import axios from 'axios'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DetailThesis = ({ route }) => {
    const { id, name } = route.params
    // console.log(id)
    const [detail, setDetail] = useState([])
    const [mark, setMark] = useState([])
    const getList = async () => {
        const { data } = await axios.get(endpoints["get-thesis"](id))
        // console.log('thông tin--------------', data)
        setDetail(data)

    }
    const myScore = async () => {
        const token = await AsyncStorage.getItem('token')
        const { data } = await authApiToken(token).get(endpoints['score-of-student'](id))
        console.log('điểm sinh viên', data)
        setMark(data)
    }
    useEffect(() => {
        getList()
        myScore()
    }, [])
    return (
        <View >
            <Text style={{
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: color.green,
                color: 'white',
                paddingVertical: 20
            }}>{name}</Text>
            <View style={login.text_input}>
                <Text style={[login.text]}>Hội đồng chấm</Text>
                <Text>{detail?.committee?.name}</Text>
            </View>

            {detail?.students?.length < 1 ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={login.text_input}>
                        <Text style={[login.text]}>Danh sách sinh viên thực hiện: {detail?.students?.length}</Text>

                    </View>
                    {detail?.students?.map((c) => (

                        <View key={c.id} style={login.text_input}>
                            <Text>
                                {c.user.first_name + " " + c.user.last_name}
                            </Text>
                        </View>
                    ))}
                </>
            )}

            {detail?.supervisors?.length < 1 ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={login.text_input}>
                        <Text style={[login.text]}>Danh sách giảng viên</Text>

                    </View>
                    {detail?.supervisors?.map((c) => (

                        <View key={c.id} style={login.text_input}>

                            <Text >
                                {c.user.first_name + " " + c.user.last_name}{'\n'}
                            </Text>

                        </View>
                    ))}
                </>
            )}

            <Text>Điểm của tôi: {mark.total}</Text>
        </View>
    )
}

export default DetailThesis