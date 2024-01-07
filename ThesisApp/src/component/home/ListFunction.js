import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Item from './Item'
import nameItem from '../../assets/js/nameItem'
import color from '../../assets/js/color'

const ListFunction = () => {
    return (
        <View style={{ backgroundColor: '#ebf5f0', marginBottom: 20, height: "100%" }}>

            <Item
                // style={[...Item, { backgroundColor: 'red' }]}
                tile={nameItem.thesi}
                note={nameItem.updateThesis}
            />
            <Item

                tile={nameItem.committess}
                note={nameItem.updateCommittess}
            />
            <Item
                tile={nameItem.score}
                note={nameItem.updateScore}
            />

        </View>
    )
}

export default ListFunction