import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from '../../assets/js/style';
import axios from 'axios';
import { endpoints } from '../../configs/Apis';

function CreateFile({ route, navigation }) {
    const { id, name } = route.params;
    console.log('id', id)
    const createFile = async () => {
        const res = await axios.get(endpoints["pdf"](id))
        console.log('link file', res.data)
        return res.data

    }
    const openPDF = async () => {
        const linkFile = await createFile()
        console.log('link==================', linkFile)
        Linking.openURL(linkFile);
    };

    useEffect(() => {
        createFile()
    }, [id])
    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <TouchableOpacity onPress={openPDF}>
                <Text>Mở tệp PDF</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateFile;