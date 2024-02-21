import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from '../../login/style'
import styles from '../../assets/js/style'
import mark from './style'
import thesis from '../thesis/style'
import { Popup } from 'react-native-popup-confirm-toast'
import ToastifyMessage from '../layout/ToastifyMessage'
const AddScore = ({ route, navigation }) => {
    const [show, setShow] = useState('')
    const [error, setError] = useState('')
    const { id, name } = route.params //id khoa luan
    const [score, setScore] = useState([])
    const [student, setStudent] = useState([])
    const [defaultScore, setDefaultScore] = useState('')
    // var list_score_criteria_user = []
    const [list_score_criteria_user, set_List_score_criteria_user] = useState([])
    const [listStudent, setListStudent] = useState([
        // {id: '', name: ''}
    ])
    const [criteria, setCriteria] = useState([]); // list tieu chi
    const [list_Score, setListScore] = useState([
        // {"student": " ",
        // "criteria": " ",
        // "thesis": " ",
        // "score": " "},
    ])

    const getScore = async () => {
        try {
            // console.log('id khoa luan', id)
            // const token = await AsyncStorage.getItem('token')
            // lấy hs làm khóa luận
            const { data } = await axios.get(endpoints['score-thesis-students'](id))
            console.log('hs thực thiện:', data)
            // điểm khóa luận, thông tin hs......
            const res = await axios.get(endpoints['get-thesis-score'](id))
            // console.log('thông tin :', res.data)
            const tempList = [];

            datascore = res.data
            data.map(d => {
                datascore.map(ds => {
                    // ktra hs có điểm chưa
                    let student = ds.student.user
                    if (d.user.id == student.id) {

                        tempList.push({ user: d.user.id, criteria: ds.criteria.id, score: ds.score });
                    }
                })

                setListStudent(pre => [...pre, { id: d.user.id, name: d.user.last_name + ' ' + d.user.first_name }])
            })
            set_List_score_criteria_user(tempList);
        } catch (error) {
            console.log('error function getStudent', error)
        }

    }
    const sendScore = async () => {
        const token = await AsyncStorage.getItem('token')
        if (list_Score.length > 0) {
            try {
                console.log('list_Score', list_Score)//không có sự thay đổi điểm

                Popup.show({

                    type: 'confirm',
                    title: 'Chấm điểm',
                    textBody: `Bạn có chắc chắn muốn cập nhật điểm ??`,
                    buttonText: 'Ok',
                    confirmText: 'Cancel',

                    // click ok
                    callback: addScore,
                    cancelCallback: () => {
                        Popup.hide();//tắt confirm
                    },
                });

                async function addScore() {
                    try {
                        Popup.hide();
                        let res = await authApiToken(token).post(endpoints['add-or-update-score'], {
                            "score": list_Score
                        })
                        console.log('danh sách điểm', res.data)

                        if (res.status == 200) {
                            setShow('success')
                            setError('Chấm điểm thành công')
                            setTimeout(() => {
                                navigation.navigate('ThesisApp')
                            }, 500)
                            // alert('thành công')
                            // navigation.navigate('ThesisApp')
                        } else {
                            setShow('danger')
                            setError('Chấm điểm thất bại')
                            alert('error!!!')
                        }
                    } catch (error) {
                        // Xử lý khi xảy ra lỗi
                        console.error('Lỗi sendScore ', error);
                        setShow('error')
                        setError("Xóa thành viên thất bại")
                    }
                }
            }
            catch (error) {
                // console.log('error function sendscore', er.request.responseText)
                console.log("lỗi..............", error.request.responseText)
                err = error.request.responseText
                // e = JSON.parse(err)
                console.log("lỗi..............", err)
                setShow('error')
                setError(err)
            }
        }
        else {
            alert('list_Score null')

        }
    }

    const getcriteria = async () => {
        try {
            const { data } = await axios.get(endpoints['criteria'], {
                "score": list_Score
            })
            setCriteria(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const addScore = (value, idhs, idcriteria, idthesis) => {
        let score_check = list_Score.find(score => score['student'] == idhs && score['criteria'] == idcriteria && score['thesis'] == idthesis) ?? undefined
        // console.log('score_check', score_check)
        if (score_check == undefined) {
            setListScore(pre => [...pre, { "student": idhs, "criteria": idcriteria, "thesis": idthesis, "score": value }])
        }
        else {
            score_check['score'] = value;
            setListScore([...list_Score]);
        }

        // console.log('list score update', list_Score)
    }
    useEffect(() => {
        getcriteria();
        getScore();
        if (show !== '') {
            const timer = setTimeout(() => {
                setShow('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        console.log(show)
    }, [id, show])
    return (
        <View style={[styles.container, mark.container]}>
            <ScrollView style={[mark.container]}>
                {listStudent.length > 0 ? <>
                    {listStudent.map(ls => {
                        return <>
                            <View key={ls.id} style={[mark.score]}>
                                <Text style={[mark.textName]}>Tên học sinh: {ls.id}- {ls.name}</Text>
                                {criteria.length > 0 ? <>
                                    {criteria.map(c => {
                                        let defaultScore = list_score_criteria_user.find(l => l.user == ls.id && l.criteria == c.id) ?? undefined;
                                        return <View key={c.id} style={[mark.items]}>
                                            <View>
                                                <Text>{c.name} ({c.percent})</Text>
                                            </View>

                                            {defaultScore == undefined ? <>
                                                <TextInput placeholder='Nhập Điểm' keyboardType='numeric' style={[mark.input]}
                                                    onChange={(e) => addScore(e.nativeEvent.text, ls.id, c.id, id)} />
                                            </> : <>
                                                <TextInput placeholder='Nhập Điểm' keyboardType='numeric' style={[mark.input]}
                                                    onChange={(e) => addScore(e.nativeEvent.text, ls.id, c.id, id)}
                                                    defaultValue={defaultScore.score + ''} />
                                            </>}

                                        </View>
                                    })}
                                </> : <>
                                    <Text>criteria rỗng</Text>
                                    <ActivityIndicator />
                                </>}
                            </View>
                        </>
                    })}
                </> : <>
                    <Text>Chưa có sinh viên được nhập điểm</Text>
                    <ActivityIndicator />
                </>}
            </ScrollView>
            <View style={[thesis.text_input]} >
                <TouchableOpacity onPress={sendScore}>
                    <Text style={login.button}>CẬP NHẬT ĐIỂM</Text>
                </TouchableOpacity>

            </View>
            {show === 'error' && (
                <ToastifyMessage
                    type="danger"
                    text={error}
                    description="Thêm thất bại"
                />
            )}
            {show === 'success' && (
                <ToastifyMessage
                    type="success"
                    text={error}
                    description="Thêm thành công"
                />
            )}
        </View>
    )
}

export default AddScore