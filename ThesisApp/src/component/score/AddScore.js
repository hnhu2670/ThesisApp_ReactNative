import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from '../../login/style'
import styles from '../../assets/js/style'
import mark from './style'
import thesis from '../thesis/style'
const AddScore = ({ route, navigation }) => {
    const { id } = route.params //id khoa luan
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
            const token = await AsyncStorage.getItem('token')
            // lấy hs làm khóa luận
            const { data } = await axios.get(endpoints['score-thesis-students'](id))
            // console.log('hs thực thiện:', data)
            // điểm khóa luận, thông tin hs......
            const res = await authApiToken(token).get(endpoints['get-thesis-score'](id))
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
        if (list_Score.length > 0) {
            try {
                console.log('list_Score', list_Score)
                const token = await AsyncStorage.getItem('token')
                let res = await authApiToken(token).post(endpoints['add-or-update-score'], {
                    "score": list_Score
                })

                if (res.status == 200) {
                    alert('Oke')
                    navigation.navigate('Thesis App')
                } else {
                    alert('error!!!')
                }

            }
            catch (er) {
                console.log('error function sendscore')
            }
        }
        else {
            let check = confirm('Ok')
            if (check) {
                navigation.navigate('ThesisApp')
            }
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
        console.log('score_check', score_check)
        if (score_check == undefined) {
            setListScore(pre => [...pre, { "student": idhs, "criteria": idcriteria, "thesis": idthesis, "score": value }])
        }
        else {
            score_check['score'] = value;
            setListScore([...list_Score]);
        }

        console.log('list score update', list_Score)
    }
    useEffect(() => {
        getcriteria();
        getScore();
        // viewScore()
    }, [id])
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
                                </>}
                            </View>
                        </>
                    })}
                </> : <>
                    <Text>Chưa có sinh viên được nhập điểm</Text>
                </>}
            </ScrollView>
            <View style={[thesis.text_input]} >
                <TouchableOpacity onPress={sendScore}>
                    <Text style={login.button}>CẬP NHẬT ĐIỂM</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default AddScore