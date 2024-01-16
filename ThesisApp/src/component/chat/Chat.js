import React from 'react'
import { Text, View } from 'react-native'
import styles from '../../assets/js/style'
import Header from '../layout/Header'
import Search from '../layout/Search'
import { ListUser } from './ListUser'

const Chat = () => {
    return (
        <View style={styles.container}>
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
            >Chat</Text>
            <Search />
            <ListUser />
        </View>
    )
}

export default Chat