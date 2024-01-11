import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState('')

    const formSearch = () => {
        onSearch(search)
    }
    return (
        <View style={style.container}>
            <View style={style.left}>
                <TextInput
                    style={style.form}
                    placeholder='Nhập tên cần tìm'
                    onChangeText={text => setSearch(text)}
                />
            </View>

            <View style={style.right}>
                <TouchableOpacity onPress={formSearch}>
                    <AntDesign name='search1' size={25} />
                </TouchableOpacity>
            </View>

        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        // backgroundColor: 'red',

    },
    left: {
        width: '80%'
    },
    right: {
        width: '15%',
        borderLeftWidth: 1,
        borderLeftColor: 'lightgray',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 10,
        // borderRadius: 10,
    },
    form: {
        padding: 15,

        height: '100%'

    }
})
export default Search