import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../component/home/Home';
import Login from '../login/Login';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Login' component={Login} />
        </Tab.Navigator>
    )
}

export default BottomTab