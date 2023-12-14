import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
const Stack = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default HomeNavigation