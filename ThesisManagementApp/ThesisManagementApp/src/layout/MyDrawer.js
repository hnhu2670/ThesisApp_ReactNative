import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Home from '../component/home/Home';
import Login from '../login/Login';



const Drawer = createDrawerNavigator();

const MyDrawer = () => {

    return (
        <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
    )
}

export default MyDrawer