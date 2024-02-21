import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    useContext
} from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Bubble, GiftedChat, MessageText } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../configs/firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MyUserContext } from '../../../App';
import mess from './style';
import color from '../../assets/js/color';
// import { endpoints } from '../config/Apis';
// import axios from 'axios';


export default function Chat() {
    const [user, dispatch] = useContext(MyUserContext);
    // const id = 1
    // const username = 'admin'
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const { id, username } = route.params;
    console.log('thông tin user', id, username)
    const [url_collection, setURL] = useState('Chat/Chat/Chat');


    const getURLChat = (id) => {
        // ktra mình là người nhắn hay người nhận tin
        if (id > user.id)
            setURL("ThesisApp/" + username + "/" + user.username);
        else {
            setURL("ThesisApp/" + user.username + "/" + username);
        }
    };
    useEffect(() => {
        getURLChat(id)
    }, [id])

    console.log('++++++++++++++', url_collection)

    useEffect(() => {
        const collectionRef = collection(database, url_collection);
        // console.log('thông tin chat', collectionRef)
        const q = query(collectionRef, orderBy('createdAt', 'desc'));//sắp xếp theo thời gian

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            // lưu tin nhắn
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id, //id user
                    createdAt: doc.data().createdAt.toDate(),//thời gian nhắn
                    text: doc.data().text, //nội dung nhắn
                    user: doc.data().user //user
                }))
            );
        });

        return unsubscribe;
    }, [url_collection]);

    // gửi tin nhắn
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        // lưu vào db trên firebase
        addDoc(collection(database, url_collection), {
            _id,
            createdAt,
            text,
            user
        });
        // lưu db chưa thông tin chat của 2 người
        addDoc(collection(database, "Chat/chatbox/chats"), {
            nguoigui: user,
            nguoinhan: id,
            createdAt
        });

    }, [url_collection], user);

    return (

        <GiftedChat
            messages={messages}
            renderBubble={props => (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        left: { backgroundColor: '#e3e8e5' },
                        right: {
                            backgroundColor: '#3b965e'
                        },
                    }}
                />
            )}
            renderMessageText={props => (
                <MessageText {...props}
                    textStyle={{
                        left: { color: 'black' }, // Màu sắc cho tin nhắn bên trái (người gửi tin)
                        right: { color: 'white' }, // Màu sắc cho tin nhắn bên phải (người nhận tin)
                    }} />
            )}
            showAvatarForEveryMessage={true}
            showUserAvatar={true}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff',
                paddingVertical: '10%',
                // paddingHorizontal: 10
            }}
            // nhập tin nhắn
            textInputStyle={[mess.textInput]}
            // ktra tin nhắn gửi hay nhận
            user={{
                _id: user.id,
                avatar: user.avatar
            }}
        />

    );
}