import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import colors from '../colors';
import { QuerySnapshot, and, collection, getDocs, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { database } from "../../configs/firebase";
import { MyUserContext } from "../../../App";
import ChatBox from "./ChatBox";
import styles from "../../assets/js/style";
import mess from "./style";
import { Fontisto } from "@expo/vector-icons";
import color from "../../assets/js/color";
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const HomeChat = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const navigation = useNavigation();
    const [chatBox, setAllbox] = useState([]);
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <FontAwesome name="search" size={24} style={{ marginLeft: 15 }} />
    //         ),
    //         headerRight: () => (
    //             <Image
    //                 source={{ uri: catImageUrl }}
    //                 style={{
    //                     width: 40,
    //                     height: 40,
    //                     marginRight: 15,
    //                 }}
    //             />
    //         ),
    //     });
    // }, [navigation]);

    const fetchData = async (userId) => {
        console.log('id ne', userId)
        const collectionRef = collection(database, 'Chat/chatbox/chats');
        const q = query(
            collectionRef, or(
                where('nguoigui._id', '==', userId),
                where('nguoinhan', '==', userId)
            )
        );

        try {
            const snapshot = await getDocs(q);
            let documents = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                documents.push(data);
            });
            console.info('======fetch========', documents)
            return documents;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            const documents = await fetchData(user.id);
            let tam = []
            documents.forEach((document) => {
                const chatBoxId = document.nguoinhan === user.id ? document.nguoigui._id : document.nguoinhan;
                if (!tam.includes(chatBoxId)) {
                    tam.push(chatBoxId);
                }
            })
            setAllbox(tam);
        };

        fetchDataAsync();
    }, [user]);

    console.info(chatBox)

    return (
        <View style={{ backgroundColor: color.background, height: '100%' }}>
            <View style={[mess.banner]}>
                <Fontisto name='hipchat' size={25} color='white' />
                <Text style={[mess.title]}>Chat ....</Text>
            </View>
            {chatBox.map((box) => box != user.id ? (
                <ScrollView style={[styles.container]}>
                    <ChatBox id={box} navigation={navigation} />
                </ScrollView>
            ) : null
            )}
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