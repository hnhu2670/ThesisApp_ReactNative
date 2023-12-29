import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import login from '../../login/style'
import styles from './style'
const AddThesis = () => {
    const [thesis, setThesis] = useState('')

    return (
        <View >
            <View >
                <View style={[styles.text_input]}>
                    <TextInput
                        style={[login.input, { fontSize: 16, textAlign: "center" }]}
                        placeholder='Tên khóa luận'

                    // onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={styles.text_input}>
                    <GetStudent />
                </View>
                <View style={styles.text_input}>
                    <GetTeacher />
                </View>
                <View style={styles.text_input}>
                    <GetTeacher />
                </View>
                <View style={[styles.text_input]}>
                    <TouchableOpacity>
                        <Text style={login.button}

                        >THÊM KHÓA LUẬN MỚI</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>



    )
}

export default AddThesis