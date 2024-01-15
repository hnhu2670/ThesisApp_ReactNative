import React, { useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Item from './Item'
import nameItem from '../../assets/js/nameItem'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'
import styles from '../../assets/js/style'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ListFunction = () => {
    const [current_user, dispatch] = useContext(MyUserContext);

    return (
        <View style={[list.container]}>
            <Item />
            <Item />
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
export default ListFunction