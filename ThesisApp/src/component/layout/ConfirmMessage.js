import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../assets/js/style';
import { Popup } from 'react-native-popup-confirm-toast';

const ConfirmMessage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    Popup.show({
                        type: 'confirm',
                        title: 'Dikkat!',
                        textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                        buttonText: 'Ok',
                        confirmText: 'Cancel',

                        // click ok
                        callback: () => {
                            // alert('Okey Callback && hidden');
                            Popup.hide();
                            navigation.navigate('Login')
                        },
                        // click Cancel
                        cancelCallback: () => {
                            // alert('Cancel Callback && hidden');
                            Popup.hide();
                            navigation.navigate('ThesisApp')

                        },
                    })
                }
            >
                <Text>Open Popup Confirm Message</Text>
            </TouchableOpacity>


        </View>

    )
}

export default ConfirmMessage