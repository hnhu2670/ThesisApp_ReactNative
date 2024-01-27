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

const DeleteMember = ({ route, navigation }) => {
    // truyền từ danh sách hội đồng
    const { id, name } = route.params;
    const [show, setShow] = useState('')
    const [messager, setMessager] = useState('')
    const [detai, setDetail] = useState([])
    const getDetail = async () => {
        try {
            const { data } = await axios.get(`${endpoints['get-member']}?committee=${id}`);
            // console.log('dữ liệu cữ', data)
            setDetail(data)
        } catch (error) {
            console.log("lỗi nè", error)
        }
    }
    const checkRemove = async (id, last_name, first_name) => {
        const token = await AsyncStorage.getItem('token')
        // gọi confirm
        Popup.show({
            type: 'confirm',
            title: 'Xóa thành viên',
            textBody: `Bạn có muốn xóa thành viên "${last_name} ${first_name}" này không ??`,
            buttonText: 'Ok',
            confirmText: 'Cancel',

            // click ok
            callback: deleteMember,
            cancelCallback: () => {
                Popup.hide();//tắt confirm
            },
        });

        async function deleteMember() {
            try {
                Popup.hide();
                const data = await authApiToken(token).delete(endpoints['delete-member-of-committee'](id));
                console.log('Xóa thành công', data.status);
                setShow('success')
                setMessager("Xóa thành viên thành công")
                await getDetail() //gọi lại hàm get để lấy thông tin


            } catch (error) {
                // Xử lý khi xảy ra lỗi
                console.error('Lỗi khi xóa thành viên', error);
                setShow('error')
                setMessager("Xóa thành viên thất bại")
            }
        }
    };

    useEffect(() => {
        getDetail()
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [show, id]);
    return (
        <View>
            <Text style={{
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: color.green,
                color: 'white',
                paddingVertical: 20
            }}>{name}</Text>
            <View style={login.text_input}>
                <Text style={[login.text]}>Số lượng thành viên: {detai.length}</Text>
            </View>
            {detai.length < 1 ? (
                <ActivityIndicator />
            ) : (
                <>

                    {detai.map((c) => (
                        <View key={c.id} style={login.text_input}>
                            <Text style={[login.text]}>{c.position.name}</Text>
                            <View style={[login.input, { flexDirection: 'row' }]}>
                                <Text style={{ width: '90%' }}>
                                    {c.user.last_name} {c.user.first_name}
                                </Text>
                                <TouchableOpacity onPress={() => checkRemove(c.id, c.user.last_name, c.user.first_name)}>
                                    <MaterialCommunityIcons name='delete' size={30} color={color.green} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </>
            )}
            {show === 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={messager}
                    description="Xóa thất bại"
                />
            )}
            {show === 'success' && (
                <ToastifyMessage
                    type="success"
                    text={messager}
                    description="Xóa thất bại"
                />
            )}
        </View>
    )
}

export default DeleteMember