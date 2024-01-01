import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import profile from './style';
import { MyUserContext } from '../../../App';
import styles from '../../assets/js/style';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiToken, endpoints } from '../../configs/Apis';

const ChangeAvatar = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("token", token)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.canceled) {
            return;
        }
        const localUri = result.assets[0].uri;
        console.log('Đường dẫn:', localUri);
        setImage(localUri);

        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('avatar', { uri: localUri, name: filename, type });

        // const formData = new FormData();
        // formData.append('avatar',
        //     {
        //         uri: localUri,
        //         name: result.assets[0].fileName,
        //         type: result.assets[0].type
        //     });

        try {
            // Gọi API để truyền ảnh xuống server
            const res = await authApiToken(token).patch(endpoints['update-user'](current_user.id),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            await AsyncStorage.setItem('user', JSON.stringify(res.data));

            dispatch({ type: 'login', payload: res.data });

        } catch (error) {
            console.error('Upload error:', error);
        }
    };
    return (
        <View
            style={{
                width: "100%", justifyContent: 'center', alignItems: 'center',
            }}>
            <View style={[profile.name, { position: "relative" }]}>
                {image ? (
                    <Image source={{ uri: image }} style={profile.container} />
                ) : (
                    <Image source={{ uri: current_user.avatar_url }} style={profile.container} />
                )}
                <View style={[profile.camera]}>
                    <TouchableOpacity onPress={pickImage}>
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