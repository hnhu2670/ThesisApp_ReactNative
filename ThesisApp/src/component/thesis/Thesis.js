import React, { Fragment } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ListThesis from './ListThesis'
import AddThesis from './AddThesis'
import Score from '../score/Score'
import profile from '../user/style'
import { AntDesign } from '@expo/vector-icons'
import styles from '../../assets/js/style'

const Thesis = ({ navigation }) => {
    return (
        <View>
            <View
                style={[profile.item, { flexDirection: "row" }]}>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Text
                        onPress={() => { navigation.navigate("Thêm khóa luận") }}
                        style={[styles.font, profile.link]}>Thêm khóa luận
                    </Text>
                    <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                </TouchableOpacity>


            </View>
            <View
                style={[profile.item, { flexDirection: "row" }]}>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Text
                        onPress={() => { navigation.navigate("Danh sách khóa luận") }}
                        style={[styles.font, profile.link]}>Danh sách khóa luận
                    </Text>
                    <AntDesign style={profile.icon} color="gray" name="right" size={20} />

                </TouchableOpacity>


            </View>

        </View>
        // <Fragment>
        //     {/* <ListThesis /> */}
        //     <AddThesis />

        // </Fragment>
    )
}

export default Thesis