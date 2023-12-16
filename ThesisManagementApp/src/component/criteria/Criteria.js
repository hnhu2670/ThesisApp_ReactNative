import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { endpoints } from '../../configs/Apis'

const Criteria = () => {
    const [criteria, setCriteria] = useState['']
    const loadCriteria = async () => {
        const res = await axios.get(endpoints["criteria"])

        if (res.status === 200) {
            const result = await res.json();
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
            {criteria.length < 1 ? (
                <Text>Chưa có dữ liệu</Text>
            ) : (
                criteria.map(c =>
                    <Text key={c.id}>Tiêu chí chấm điểm: {c.name}</Text>
                )
            )}
        </View>

    )
}

export default Criteria