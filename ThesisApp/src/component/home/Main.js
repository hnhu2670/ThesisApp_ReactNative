import React, { Fragment } from 'react'
import { Text, View } from 'react-native'
import MainHeader from '../layout/MainHeader'
import MenuBottomTab from './MenuBottomTab'


const Main = () => {
    return (
        <Fragment>
            <MainHeader />
            <MenuBottomTab />
        </Fragment>

    )
}

export default Main