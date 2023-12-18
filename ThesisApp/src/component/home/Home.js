import React, { Fragment } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';
import MainHeader from '../layout/MainHeader';

const Home = ({ navigation }) => {
    return (
        <Fragment>
            <MainHeader navigation={navigation} />
        </Fragment>

    );
};

export default Home