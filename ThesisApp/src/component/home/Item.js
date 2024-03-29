import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import color from '../../assets/js/color'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = (props) => {
    return (
        <View style={[items.container]}>
            <View style={items.text}>
                <Text style={items.tile}>{props.tile}</Text>
            </View>
            <TouchableOpacity style={items.button}>
                <Text style={items.btn_text}>Chi tiết</Text>
                <AntDesign name='rightcircleo' size={20} color={color.green} />
            </TouchableOpacity>
        </View>
    )
}
const items = StyleSheet.create({
    container: {
        width: windowWidth * 0.43,
        height: 190,
        marginHorizontal: '1%',
        borderRadius: 30,
        backgroundColor: color.lightgreen,
        position: 'relative',

    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    tile: {
        fontSize: 18,
        marginVertical: 40,
        marginHorizontal: 20,
        color: color.green
    },

    button: {
        width: '90%',
        backgroundColor: 'white',
        padding: 12,
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center'

    },
    btn_text: {
        width: '80%',
        color: color.green
    }
})
export default Item