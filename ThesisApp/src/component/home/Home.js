import React, { Fragment } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';
import MainHeader from '../layout/MainHeader';
import ListFunction from './ListFunction';

const Home = ({ navigation }) => {
    return (
        <View>
            <MainHeader navigation={navigation} />
            <ScrollView style={{ height: '80%' }}>
                <ListFunction />

            </ScrollView>
        </View>

    );
};

export default Home