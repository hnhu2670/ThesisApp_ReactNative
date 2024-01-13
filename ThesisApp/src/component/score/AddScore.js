import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddScore = ({ route }) => {
    const { id } = route.params //id khoa luan
    const [score, setScore] = useState([])
    const [student, setStudent] = useState([])
    const [defaultScore, setDefaultScore] = useState('')
    // var list_score_criteria_user = []
    const [list_score_criteria_user, set_List_score_criteria_user] = useState([])
    const [listStudent, setListStudent] = useState([
        // {id: '', score: ''}
    ])
    const [criteria, setCriteria] = useState([]); // list tieu chi

    const getScore = async () => {
        try {
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
                // console.log('data', d.user.id)
                datascore.map(ds => {
                    // console.log('có điểm chưa', ds.score, ds.student.user.id)
                    // ktra hs có điểm chưa
                    if (d.user.id == ds.student.user.id) {
                        // set_List_score_criteria_user(pre => [...pre, { user: d.user.id, criteria: ds.criteria.id, score: ds.score }])
                        // console.log('+++++++++++++++++++++++++++', list_score_criteria_user[1]?.user)
                        tempList.push({ user: d.user.id, criteria: ds.criteria.id, score: ds.score });


                    }
                })
                //     // console.log('---------', list_score_criteria_user)
                setListStudent(pre => [...pre, { id: d.user.id, name: d.user.last_name + ' ' + d.user.first_name }])
            })
            set_List_score_criteria_user(tempList);
        } catch (error) {
            console.log('error function getStudent', error)
        }

    }

    const sendScore = () => {
        console.log('listStudent ', listStudent)
    }

    const getcriteria = async () => {
        try {
            const { data } = await axios.get(endpoints['criteria'])
            setCriteria(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const viewScore = async () => {
        // console.log('ds sinh viên', listStudent)
        const data = listStudent
        console.log('ds sinh viên', data)

        console.log('tiêu chí', criteria)
        console.log('kiểm tra điểm', list_score_criteria_user)
        return (<>
            {listStudent.map(s => {
                criteria.map(c => {
                    list_score_criteria_user.map(m => {
                        return (<>
                            <View key={c.id}>
                                <Text>{c.name}</Text>
                            </View>
                        </>)
                    })
                })
            })}
        </>)
    }
    useEffect(() => {
        getcriteria();
        getScore();
        viewScore()
        // sendScore()
        // console.log('danh sách:=============', list_score_criteria_user)
        // console.log('list student e', listStudent)

    }, [])
    return (
        <View>
            <Text>111111</Text>
            {listStudent.map(s => {
                return <>
                    {criteria.length > 0 ? <>
                        {criteria.map(c => {
                            return <>
                                {list_score_criteria_user.length > 0 ? <>
                                    {list_score_criteria_user.map(m => {
                                        return (<>
                                            <View key={c.id}>
                                                <Text>{c.name}</Text>
                                                <Text>2222</Text>
                                            </View>
                                        </>)
                                    })}
                                </> : <>

                                    <Text>list_score_criteria_user rỗng</Text></>}
                            </>
                        })}
                    </> : <>
                        <Text>dữ liệu criteria rỗng</Text>
                    </>}

                </>
            })}
            {/* {listStudent.length > 0 ? <>
                {listStudent.map(s => {
                    let list_score = listStudent.filter(obj => obj.id == s.id)
                    // console.log(list_score)
                    // var defaultscore = ''
                    return <View>
                        <Text>{s.id} {s.name} --- nháp nha{console.log(s.list_score)}</Text>
                        {criteria.length < 1 ? <></> : <>
                            <Text>Sinh Viên: {s.name} ({s.id})</Text>
                            {criteria.map(c => {
                                // console.log(list_score, 'và', c.id)

                                let list_filter = list_score_criteria_user.filter(score => (
                                    score.user == s.id && score.criteria == c.id
                                ))
                                console.log('list_filter', list_filter)
                                if(list_filter.length > 0){
                                    // defaultscore = list_filter[0].score
                                    setDefaultScore(list_filter[0].score)
                                    // console.log('default score',defaultscore)
                                }
                                return <View>
                                    <Text>{c.id}.{c.name} ({c.percent})</Text>
                                    <TextInput placeholder='Nhập điểm'
                                        value={list_filter[0]?.score}
                                    />
                                </View>
                            })}
                        </>}
                    </View>
                })}
            </> : <><Text>No Data</Text></>} */}
        </View>
    )
}

export default AddScore