import React from 'react'
import { HomeNavigation } from './HomeNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

const MenuBottomTab = () => {
    return (

        <Tab.Navigator>
            {HomeNavigation.map(tab => (
                <Tab.Screen
                    key={tab.id}
                    name={tab.name}
                    component={tab.route}
                    options={{ headerShown: false }}

                />
            ))}
        </Tab.Navigator>


    );
};

export default MenuBottomTab