import React from 'react'
import { HomeNavigation } from './HomeNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();

const BottomTab = ({ navigation }) => {
    return (

        <Tab.Navigator>
            {HomeNavigation.map(tab => (
                <Tab.Screen
                    key={tab.id}
                    name={tab.name}
                    component={tab.route}

                />
            ))}
        </Tab.Navigator>


    );
};

export default BottomTab