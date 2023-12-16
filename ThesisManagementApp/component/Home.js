import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../resources/js/style';
import { Button } from 'react-native';
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />

        </View>
    );
};

export default Home