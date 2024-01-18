import React, { useState } from 'react'
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from '../../assets/js/style';

const ModalConfirm = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={toggleModal}>
                <Text>Show</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 70 }}>
                <Modal >
                    <View>
                        <Text>hello</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text>hide</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>


        </View>
    )
}

export default ModalConfirm