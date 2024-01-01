import axios from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { endpoints } from '../../configs/Apis'
import ListThesis from '../thesis/ListThesis'

const Score = () => {
    return (
        <View>
            <Text>chấm điểm</Text>
            <ListThesis />
        </View>
    )
}

export default Score