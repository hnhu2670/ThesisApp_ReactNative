import axios from 'axios'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native'
import { endpoints } from '../../configs/Apis'
import ListThesis from '../thesis/ListThesis'
import styles from '../../assets/js/style'
import Header from '../layout/Header'
import ListThesisForScore from '../thesis/ListThesisForScore'
import Search from '../layout/Search'

const Score = () => {
    return (
        <View style={[styles.container]}>
            <Header />

            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'left',
                    width: '100%',
                    fontStyle: 'italic',
                    marginBottom: '10%',
                    color: color.green
                }}
            >Điểm khóa luận</Text>
            <Search />
            <ListThesisForScore />

        </View>
    )
}

export default Score