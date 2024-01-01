import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import Score from '../score/Score'


const Criteria = () => {
    const [criteria, setCriteria] = useState("")
    const loadCriteria = async () => {
        const res = await axios.get(endpoints["criteria"])

        if (res.status === 200) {
            const result = await res.data;
            setCriteria(result);

        } else {
            throw new Error(res.statusText);
        }
    }
    useEffect(() => {
        loadCriteria();
    }, []);
    return (
        <View>

            {/* <Text>criteria</Text>
            {criteria.length < 1 ? (
                <Text>Chưa có dữ liệu</Text>
            ) : (
                criteria.map(c =>
                    <Text key={c.id}>Tiêu chí chấm điểm: {c.name}</Text>
                )
            )}
            <Text>tên khóaluaanj</Text>
            <Text>DS sinh viên của khóa luận đó để nhập điểm</Text> */}

            <Score />
        </View>

    )
}

export default Criteria