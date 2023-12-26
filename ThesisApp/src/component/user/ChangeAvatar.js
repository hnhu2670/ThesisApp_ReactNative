import React, { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import profile from './style';
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import { AntDesign } from '@expo/vector-icons';

const ChangeAvatar = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);

    return (
        <View
            style={{
                width: "100%", justifyContent: 'center', alignItems: 'center',
            }}>
            <View style={[profile.name, { position: "relative" }]}>
                <Image
                    style={profile.container}
                    source={{ uri: current_user.avatar }}

                />
                <View style={[profile.camera]}>
                    <TouchableOpacity >
                        <AntDesign color="#2d665f" name="camerao" size={25} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={profile.name}>
                <Text style={[styles.font, { fontSize: 25 }]}>
                    {current_user.first_name} {current_user.last_name}
                </Text>
                <Text style={profile.text}>
                    Chức vụ: {current_user.role}
                </Text>
            </View>

        </View>
    )
}

export default ChangeAvatar