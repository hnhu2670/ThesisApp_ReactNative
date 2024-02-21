import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import colors from '../colors';
import { QuerySnapshot, and, collection, getDocs, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { database } from "../../configs/firebase";
import { MyUserContext } from "../../../App";
import ChatBox from "./ChatBox";
import styles from "../../assets/js/style";
import mess from "./style";
import { Entypo, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../assets/js/color";
import Search from "../layout/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../../configs/Apis";
import axios from "axios";
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const HomeChat = () => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const navigation = useNavigation();
    const [chatBox, setAllbox] = useState([]);
    const [filter, setFilter] = useState([])

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const { data } = await axios.get(endpoints['get-user-role']);
                setAllbox(data);
            } catch (error) {
                console.log("Lỗi get teacher", error);
            }
        };
        fetchDataAsync();
    }, []);

    const searchName = (text) => {
        const filterName = chatBox.filter((item) =>
            item?.username?.toLowerCase().includes(text.toLowerCase())
        );
        setFilter(filterName)
    };


    return (
        <View style={{ backgroundColor: color.background }}>
            <View style={[mess.banner]}>
                <Fontisto name='hipchat' size={25} color='white' />
                <Text style={[mess.title]}>Messager </Text>
            </View>
            <View style={[styles.container]}>
                <View>
                    <Search onSearch={searchName} />
                </View>
                <ScrollView style={[mess.container]}>
                    {chatBox.length < 1 ? (
                        // <Text>Chưa có dữ liệu</Text>
                        <ActivityIndicator />
                    ) : filter.length > 0 ? (

                        filter.map(c => {
                            if (c.id === current_user.id) {
                                return null
                            }
                            else {
                                return (
                                    <TouchableOpacity key={c.id} style={[mess.item]}
                                        onPress={() => navigation.navigate('Messager', { id: c.id, username: c.username })}
                                    >
                                        <View style={[mess.formImage]}>
                                            <Image style={[mess.image]}
                                                source={{ uri: c?.avatar_url }}

                                            />
                                        </View>
                                        <View style={{ width: '65%' }}>
                                            <Text style={[mess.userName]}>{c.username}</Text>
                                            <Text style={[mess.fullName]}>{c.last_name} {c.first_name}</Text>
                                        </View>
                                        <View style={{ width: '15%' }}>
                                            <MaterialCommunityIcons name="hand-wave-outline" size={25} color={color.green} />
                                        </View>

                                    </TouchableOpacity>
                                )
                            }

                        }

                        )) : (
                        chatBox.map(c => {
                            if (c.id === current_user.id) {
                                return null
                            }
                            else {
                                return (
                                    <TouchableOpacity key={c.id} style={[mess.item]}
                                        onPress={() => navigation.navigate('Messager', { id: c.id, username: c.username })}
                                    >
                                        <View style={[mess.formImage]}>
                                            <Image style={[mess.image]}
                                                source={{ uri: c?.avatar_url }}

                                            />
                                        </View>
                                        <View style={{ width: '65%' }}>
                                            <Text style={[mess.userName]}>{c.username}</Text>
                                            <Text style={[mess.fullName]}>{c.last_name} {c.first_name}</Text>
                                        </View>
                                        <View style={{ width: '15%' }}>
                                            <MaterialCommunityIcons name="hand-wave-outline" size={25} color={color.green} />
                                        </View>

                                    </TouchableOpacity>
                                )
                            }
                        }

                        )
                    )
                    }
                </ScrollView>
            </View>


        </View>
    );
};

export default HomeChat;

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         // justifyContent: 'flex-end',
//         // alignItems: 'flex-end',
//         backgroundColor: "#fff",
//     },
//     chatButton: {
//         // backgroundColor: colors.primary,
//         height: 50,
//         width: 50,
//         borderRadius: 25,
//         alignItems: 'center',
//         justifyContent: 'center',
//         // shadowColor: colors.primary,
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: .9,
//         shadowRadius: 8,
//         marginRight: 20,
//         marginBottom: 50,
//     }
// });