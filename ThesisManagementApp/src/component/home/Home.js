import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';

const Home = ({ navigation }) => {
    return (

        <View>
            <Headers />
            <ScrollView>
                <View style={home.bottom}>
                    <View style={[home.item, { marginTop: 0 }]}>
                        <Text style={home.text}>Part 1</Text>
                    </View>
                    <View style={home.item}>
                        <Text style={home.text}>Part 2</Text>
                    </View>
                    <View style={home.item}>
                        <Text style={home.text}>Part 3</Text>

                    </View>
                    <View style={home.item}>
                        <Text style={home.text}>Part 1</Text>
                    </View>
                    <View style={home.item}>
                        <Text style={home.text}>Part 2</Text>
                    </View>
                    <View style={home.item}>
                        <Text style={home.text}>Part 3</Text>

                    </View>
                </View>
            </ScrollView >


        </View>

    );
};

export default Home