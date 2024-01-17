import React from 'react'
import { HomeNavigation } from './HomeNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import styles from '../../assets/js/style';

const Tab = createBottomTabNavigator()

const MenuBottomTab = () => {
    return (

        <Tab.Navigator >
            {HomeNavigation.map(tab => (
                <Tab.Screen
                    style={styles.background}
                    key={tab.id}
                    name={tab.name}
                    component={tab.route}
                    options={
                        {
                            tabBarLabel: ({ focused }) => {
                                return focused ? (
                                    <Text style={{ color: '#2d665f' }}>{tab.name}</Text>
                                ) : null;
                            },
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <Icon
                                    name={tab.activeIconName}
                                    color={focused ? "#2d665f" : "gray"}
                                    size={focused ? tab.activeSize : tab.unactiveSize}
                                />
                            )

                        }

                    }

                />
            ))}
        </Tab.Navigator>


    );
};

export default MenuBottomTab