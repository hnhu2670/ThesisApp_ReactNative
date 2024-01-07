// import { createDrawerNavigator } from '@react-navigation/drawer';
// import React from 'react'
// import { HomeNavigation } from './HomeNavigation';
// import { Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Drawer = createDrawerNavigator();

// const DrawerTab = () => {
//     return (
//         <Drawer.Navigator >
//             {HomeNavigation.map(tab => (
//                 <Drawer.Screen
//                     style={styles.background}
//                     key={tab.id}
//                     name={tab.name}
//                     component={tab.route}
//                     options={
//                         {
//                             tabBarLabel: ({ focused }) => {
//                                 return focused ? (
//                                     <Text style={{ color: '#2d665f' }}>{tab.name}</Text>
//                                 ) : null;
//                             },
//                             headerShown: false,
//                             tabBarIcon: ({ focused }) => (
//                                 <Icon
//                                     name={tab.activeIconName}
//                                     color={focused ? "#2d665f" : "gray"}
//                                     // type={tab.typeIcon}
//                                     size={focused ? tab.activeSize : tab.unactiveSize}
//                                 />
//                             )

//                         }

//                     }

//                 />
//             ))}
//         </Drawer.Navigator>
//     )
// }

// export default DrawerTab