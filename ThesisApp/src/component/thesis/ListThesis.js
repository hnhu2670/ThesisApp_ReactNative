import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { endpoints } from '../../configs/Apis'

const ListThesis = () => {
    const [list, setList] = useState('')

    const getListThesis = async () => {
        const res = await axios.get(endpoints["list-thesis"])

        if (res.status === 200) {
            const result = await res.data;
            setList(result);

        } else {
            throw new Error(res.statusText);
        }
    }

    useEffect(() => {
        getListThesis();
    }, []);
    return (
        <View>
            <Text>ListThesis</Text>
            {list.length < 1 ? (
                <Text>Chưa có dữ liệu</Text>
            ) : (
                list.map(c =>
                    <Text key={c.id}>Danh sách khóa luận: {c.name}</Text>
                )
            )}
        </View>
    )
}

export default ListThesis