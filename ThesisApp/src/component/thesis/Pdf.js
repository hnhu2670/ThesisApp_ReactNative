import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { endpoints } from '../../configs/Apis';

// ...
const Pdf = ({ route }) => {
    const { id } = route.params;
    console.log('id khóa luận', id)
    const [file, setFile] = useState('')
    const createPdf = async () => {
        const res = await axios.get(endpoints["pdf"](id))
        console.log('data', res.data)
        // setFile(res.data)
        return res.data
    }

    // const urlToOpen = 'https://www.example.com';

    const handlePress = async () => {
        const data = await createPdf()
        try {
            await InAppBrowser.open(data, {
                // Các tùy chọn có thể được cấu hình tại đây
                // Ví dụ: toolbarColor, showTitle
            });
        } catch (error) {
            console.error('Lỗi mở trình duyệt:', error.message);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Text>Mở trang web</Text>
            </TouchableOpacity>
        </View>
    );
};
// useEffect(() => {
//     createPdf()
// }, [id])
// return <WebView source={{ uri: file }} style={{ flex: 1 }} />;

export default Pdf


// export default MyComponent;
