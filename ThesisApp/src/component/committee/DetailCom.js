import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis';
import login from '../../login/style';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Popup } from 'react-native-popup-confirm-toast';
import ToastifyMessage from '../layout/ToastifyMessage';
import color from '../../assets/js/color';

const DetailCom = ({ route, navigation }) => {
    // truyền từ danh sách hội đồng
    const { id, name } = route.params;
    const [detai, setDetail] = useState([])
    const getDetail = async () => {
        try {
            const { data } = await axios.get(`${endpoints['get-member']}?committee=${id}`);
            setDetail(data)
        } catch (error) {
            console.log("lỗi nè", error)
        }
    }
    useEffect(() => {
        getDetail()

    }, [id]);
    return (
        <View>
            <Text style={{
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: color.green,
                color: 'white',
                paddingVertical: 20
            }}>{name}</Text>

            {detai.length < 1 ? (
                // <ActivityIndicator />
                <Text style={[login.text]}>Số lượng thành viên: {detai.length}</Text>
            ) : (
                <>
                    <View style={login.text_input}>
                        <Text style={[login.text]}>Số lượng thành viên: {detai.length}</Text>
                    </View>
                    {detai.map((c) => (
                        <View key={c.id} style={login.text_input}>
                            <Text style={[login.text]}>{c.position.name}</Text>
                            <View style={[login.input, { flexDirection: 'row' }]}>
                                <Text style={{ width: '90%' }}>
                                    {c.user.last_name} {c.user.first_name}
                                </Text>

                            </View>

                        </View>
                    ))}
                </>
            )}

        </View>
    )
}

export default DetailCom