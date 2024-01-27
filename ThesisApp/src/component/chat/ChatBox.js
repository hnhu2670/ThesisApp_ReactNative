import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { endpoints } from '../../configs/Apis';
import axios from 'axios';
// import profileStyle from '../constants/profileStyle';
// import styles from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import mess from './style';
import Search from '../layout/Search';

const ChatBox = ({ id, navigation }) => {
  // user được chat
  const [otherUser, setUser] = useState([]);
  const getUser = async () => {
    // console.log("id user", id);
    const { data } = await axios.get(endpoints["get-user"](id));
    // console.log('data', data);
    setUser(data);
  };

  useEffect(() => {
    getUser()
  }, [id]);

  // console.log(otherUser.username)
  return (
    <View>
      <View>
        <Search />
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Messager', { id: otherUser.id, username: otherUser.username })}
          style={{ marginBottom: 10 }}
        >
          <View style={[mess.item]}>
            <View style={[mess.formImage]}>
              <Image style={[mess.image]}
                source={{ uri: otherUser.avatar_url }} />
            </View>
            <View>
              <Text style={[mess.userName]}>{otherUser.username}</Text>
              <Text style={[mess.fullName]}>{otherUser.last_name} {otherUser.first_name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default ChatBox