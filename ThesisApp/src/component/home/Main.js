import React, { Fragment } from 'react'
import { Text, View } from 'react-native'
import MenuBottomTab from './MenuBottomTab'
import styles from '../../assets/js/style'
import DrawerTab from './DrawerTab'


const Main = ({ navigation }) => {
    return (
        <Fragment>
            {/* <DrawerTab navigation={navigation} /> */}
            <MenuBottomTab />
        </Fragment>

    )
}

export default Main