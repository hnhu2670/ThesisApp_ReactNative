import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from '../../assets/js/style';

function CreateFile() {
    const openPDF = () => {
        const fileUrl = 'https://example.com/path/to/file.pdf'; // Đường dẫn tệp PDF của bạn

        Linking.openURL(fileUrl);
    };

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <TouchableOpacity onPress={openPDF}>
                <Text>Mở tệp PDF</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateFile;