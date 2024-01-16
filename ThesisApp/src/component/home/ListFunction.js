import React, { useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Item from './Item'
import nameItem from '../../assets/js/nameItem'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'
import styles from '../../assets/js/style'
import { AntDesign } from '@expo/vector-icons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListFunction = ({ navigation }) => {

    const committee = () => {
        navigation.navigate('Danh sách hội đồng')
    }
    return (
        <View style={[list.container]}>
            <View style={[items.container]}>
                <View style={items.text}>
                    <Text style={items.tile}>Danh sách hội đồng</Text>
                </View>
                <TouchableOpacity style={items.button} onPress={committee}>
                    <Text style={items.btn_text}>Chi tiết</Text>
                    <AntDesign name='rightcircleo' size={20} color={color.green} />
                </TouchableOpacity>
            </View>
            <View style={[items.container]}>
                <View style={items.text}>
                    <Text style={items.tile}>Danh sách khóa luận</Text>
                </View>
                <TouchableOpacity style={items.button} onPress={() => { navigation.navigate('Danh sách khóa luận') }}>
                    <Text style={items.btn_text}>Chi tiết</Text>
                    <AntDesign name='rightcircleo' size={20} color={color.green} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const list = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'row',
        width: windowWidth,

    }
})
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
export default ListFunction