import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    useContext
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
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
        if (id > user.id)
            setURL("ASSS/" + username + "/" + user.username);
        else {
            setURL("ASSS/" + user.username + "/" + username);
        }
    };

    const data = {

    }

    useEffect(() => {
        getURLChat(id)
    }, [id])

    console.log('++++++++++++++', url_collection)

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity
    //                 style={{
    //                     marginRight: 10
    //                 }}
    //                 onPress={onSignOut}
    //             >
    //                 <AntDesign name="logout" size={24} style={{ marginRight: 10 }} />
    //             </TouchableOpacity>
    //         )
    //     });
    // }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = collection(database, url_collection);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return unsubscribe;
    }, [url_collection]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, url_collection), {
            _id,
            createdAt,
            text,
            user
        });
        // lưu vào db tạm
        addDoc(collection(database, "Chat/chatbox/chats"), {
            nguoigui: user,
            nguoinhan: id,
            createdAt
        });

    }, [url_collection], user);

    return (

        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            // nhập tin nhắn
            textInputStyle={[mess.textInput]}
            user={{
                _id: user.id,
                avatar: user.avatar
            }}
        />
    );
}