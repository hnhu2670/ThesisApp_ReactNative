import React from 'react'
import { Text, View } from 'react-native'
import styles from '../../assets/js/style'

const TableScore = () => {
    return (
        <View style={[styles.container]}>
            <View>
                <Text>Tên khóa luận</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>Tên sinh viên</Text>
                    <Text>Trung bình</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>Tên sinh viên1</Text>
                    <Text>8</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>Tên sinh viên2</Text>
                    <Text>8</Text>

                </View>
            </View>

        </View>
    )
}

export default TableScore