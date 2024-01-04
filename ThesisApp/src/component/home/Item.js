import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import color from '../../assets/js/color'

const Item = (props) => {
    return (
        <View style={[items.container]}>
            <View style={items.text}>
                <Text style={items.tile}>{props.tile}</Text>
                <Text style={items.note}>{props.note}</Text>
            </View>
            <View style={items.button}>
                <Text style={items.btn_text}>Chi tiết</Text>
                <AntDesign name='rightcircleo' size={20} />
            </View>
        </View>
    )
}
const items = StyleSheet.create({
    container: {
        width: '80%',
        height: 250,
        padding: '5%',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginVertical: 20,
        marginHorizontal: '9%',
        borderRadius: 30,
        backgroundColor: color.lightgreen,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    text: {
        textAlign: 'center',
        height: 140,
        marginBottom: 20,
        textAlign: 'center',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    tile: {
        fontSize: 25,
        marginVertical: 35,
        color: color.green

    },
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        color: color.green
    },
    button: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    btn_text: {
        marginLeft: 15,
        textAlign: "left",
        width: '80%',
        color: color.green

    }
})
export default Item