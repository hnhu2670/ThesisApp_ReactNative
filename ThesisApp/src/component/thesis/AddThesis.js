import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import GetStudent from './GetStudent'
import GetTeacher from './GetTeacher'
import login from '../../login/style'
import styles from './style'
const AddThesis = () => {
    const [thesis, setThesis] = useState('')

    return (
        <View style={{ flexDirection: "column" }}>
            <View style={{ height: "40%" }}>
                <Image
                    style={styles.banner}
                    source={{ uri: 'https://res.cloudinary.com/dhdca9ibd/image/upload/v1703346554/thesis_dlgjo5.webp' }}
                />
            </View>
            <View style={{ height: "60%" }}>
                <View style={[styles.text_input]}>
                    <TextInput
                        style={[login.input, { height: 60, fontSize: 16, textAlign: "center" }]}
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