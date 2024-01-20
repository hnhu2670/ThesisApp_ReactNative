import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import Search from '../layout/Search'
import ListUser from './ListUser'
import Header from '../layout/Header'
import styles from '../../assets/js/style'
import color from '../../assets/js/color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Chat = () => {
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: windowHeight }]}>
            <Header />
            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'left',
                    width: '100%',
                    fontStyle: 'italic',
                    marginBottom: '3%',
                    color: color.green
                }}
            >Chat</Text>
            <Text style={{
                marginVertical: 10,
                color: 'gray',
                fontStyle: 'italic'
            }}>Chọn người dùng mà bạn luốn liên lạc !!!</Text>
            <ListUser />
        </View>
    )

}

export default Chat