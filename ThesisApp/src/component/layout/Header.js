import React from 'react'
import { StyleSheet, Text } from 'react-native'
import color from '../../assets/js/color'

const Header = () => {
    return (
        <Text style={banner.tile}>Thesis App</Text>
    )
}
const banner = StyleSheet.create({
    tile: {
        width: '100%',
        color: color.green,
        fontSize: 30,
        paddingVertical: '5%',
        marginBottom: '2%',
        textAlign: 'right'
        // backgroundColor: 'green',

    }
})
export default Header