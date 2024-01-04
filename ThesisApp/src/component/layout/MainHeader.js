import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/js/style';
import color from '../../assets/js/color';


const MainHeader = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={[styles.container, { flexDirection: "row" }]}>
            <View
                style={{ width: '80%' }}>
                <Text style={{ fontSize: 30, flex: 1, alignItems: 'center', paddingVertical: 30, color: color.green }}>ThesisApp</Text>
            </View>
            <View style={header.container}>
                <View>
                    <TouchableOpacity onPress={goToProfile}>
                        <Image
                            style={header.avatar}
                            source={{ uri: current_user?.avatar_url }}
                        />
                    </TouchableOpacity>

                </View>
                {/* <View >
                    <Text style={header.text}
                        onPress={goToProfile}>
                        Hello, {current_user.first_name} {current_user.last_name} !!!!!!</Text>
                    <Text style={header.text}>{current_user.role}</Text>
                </View> */}

            </View>

        </View>

    )
}

const header = StyleSheet.create({
    container: {
        width: "80%",
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "lightblue"
    },
    avatar: {
        // backgroundColor: "green",
        height: 70,
        width: 70,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "green",
        marginLeft: 10,
        marginRight: 10
    },
    // text: {
    //     textAlign: "right"
    // }
})
export default MainHeader