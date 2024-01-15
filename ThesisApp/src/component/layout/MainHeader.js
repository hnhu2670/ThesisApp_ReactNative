import React, { useContext, useEffect, useState } from 'react'
import { MyUserContext } from '../../../App';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { authApi, authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/js/style';
import color from '../../assets/js/color';

import { Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainHeader = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={[, header.background]}>
            <Text style={header.bannerName}>ThesisApp</Text>

            <View style={[header.bottom]}>
                <TouchableOpacity onPress={goToProfile}>
                    <Image
                        style={header.avatar}
                        source={{ uri: current_user?.avatar_url }}
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={header.text}>
                        {/* <AntDesign name='smileo' size={20} /> */}
                        Hello!!!
                        <FontAwesome name='angellist' size={20} />
                    </Text>
                    <Text style={[header.text, { fontWeight: 200 }]}>
                        {current_user.last_name} {current_user.first_name}
                    </Text>
                </View>


            </View>


        </View>

    )
}

const header = StyleSheet.create({
    background: {
        paddingVertical: '13%',
        paddingHorizontal: '5%',
        backgroundColor: color.green,
        height: windowHeight * 0.25,
    },
    bottom: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bannerName: {
        color: 'white',
        fontSize: 35,
        textAlign: 'right'
    },
    avatar: {
        width: 70,
        height: 70,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 35,
        backgroundColor: 'gray',
        marginRight: 20
    },
    text: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
        marginBottom: 5
    }
})
export default MainHeader