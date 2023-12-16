import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Login from '../Login/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const Header = () => {
    const navigation = useNavigation();
    // const Tab = useNavigation();

    return (
        <View>
            <Text>My App</Text>
            <TouchableOpacity onPress={() => navigation.navigate('/login')}>
                <Text>Login</Text>
            </TouchableOpacity>
            {/* <Stack.Navigator>
                <Stack.Screen name="login" component={Login} />
            </Stack.Navigator> */}

        </View>

    );
};
export default Header