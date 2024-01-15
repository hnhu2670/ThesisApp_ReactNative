import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { authApiToken, endpoints } from '../../configs/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from '../../login/style'

const AddScore = ({ route }) => {
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
            // console.log('data score 111   ', datascore)
            data.map(d => {
                // console.log('data', d.user.id)
                datascore.map(ds => {
                    // console.log('có điểm chưa', ds.score, ds.student.user.id)
                    // ktra hs có điểm chưa
                    let student = ds.student.user
                    // console.log('stuedent', student)
                    if (d.user.id == student.id) {
                        // set_List_score_criteria_user(pre => [...pre, { user: d.user.id, criteria: ds.criteria.id, score: ds.score }])
                        // console.log('+++++++++++++++++++++++++++', list_score_criteria_user[1]?.user)
                        tempList.push({ user: d.user.id, criteria: ds.criteria.id, score: ds.score });


                    }
                })
                // console.log('tempList    ', tempList)
                //     // console.log('---------', list_score_criteria_user)
                setListStudent(pre => [...pre, { id: d.user.id, name: d.user.last_name + ' ' + d.user.first_name }])
            })
            set_List_score_criteria_user(tempList);
        } catch (error) {
            console.log('error function getStudent', error)
        }

    }

    const sendScore = async () => {
        if (list_Score.length > 0){
            try{
                console.log('list_Score',list_Score)
                const token = await AsyncStorage.getItem('token')
                let res = await authApiToken(token).post(endpoints['add-or-update-score'],{
                    "score": list_Score
                })

                if (res.status == 200){
                    alert('Oke')
                }else{
                    alert('error!!!')
                }

            }
            catch(er){
                console.log('error function sendscore')
            }
        }
        else{
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

    // const viewScore = async () => {
    //     // console.log('ds sinh viên', listStudent)

    //     return <>

    //     </>
    // }

    const addScore = (value, idhs, idcriteria, idthesis) => {
        
        // {"student": " ",
        // "criteria": " ",
        // "thesis": " ",
        // "score": " "},
            let score_check = list_Score.find(score => score['student'] == idhs && score['criteria'] == idcriteria && score['thesis'] == idthesis) ?? undefined
            console.log('score_check', score_check)
            if(score_check == undefined){
                setListScore(pre => [...pre,{"student": idhs, "criteria": idcriteria, "thesis": idthesis, "score": value}])
            }
            else{
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
        <View>
            {listStudent.length > 0 ? <>
                {listStudent.map(ls => {

                    return <>
                        <View key={ls.id}>
                        <Text>Tên học sinh: {ls.id}- {ls.name}</Text>
                        {criteria.length > 0 ? <>
                            {criteria.map(c => {
                                let defaultScore = list_score_criteria_user.find(l => l.user == ls.id && l.criteria == c.id) ?? undefined;
                                // console.log(defaultScore)
                                return <View key={c.id}>
                                    <Text>{c.id} {c.name} ({c.percent})</Text>
                                    {defaultScore == undefined ? <>
                                        <TextInput placeholder='Nhập Điểm' keyboardType='numeric' onChange={(e) => addScore(e.nativeEvent.text, ls.id, c.id, id)} />
                                    </> : <>
                                        <TextInput placeholder='Nhập Điểm' keyboardType='numeric' onChange={(e) => addScore(e.nativeEvent.text, ls.id, c.id, id)} defaultValue={defaultScore.score + ''} />
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
                <Text>listStudent rỗng</Text>
            </>}
            <TouchableOpacity onPress={sendScore}>
                    <Text style={login.button}>THÊM</Text>
                </TouchableOpacity>
            {/* {listStudent.map(s => {
                return <>
                    {criteria.length > 0 ? <>
                        {criteria.map(c => {
                            return <>
                                {list_score_criteria_user.length > 0 ?
                                    <>
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
            })} */}
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