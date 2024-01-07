import React, { Fragment } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ListThesis from './ListThesis'
import AddThesis from './AddThesis'
import Score from '../score/Score'
import profile from '../user/style'
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import styles from '../../assets/js/style'
import thesis from './style'
import Header from '../layout/Header'
import color from '../../assets/js/color'

const Thesis = ({ navigation }) => {
    return (
        <View style={[styles.container, thesis.contain]}>
            <Header />
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'left',
                    width: '100%',
                    fontStyle: 'italic',
                    marginBottom: '10%',
                    color: color.green
                }}
            >Quản lý khóa luận</Text>
            <View style={thesis.top_thesis}>
                <View style={thesis.top_items}>
                    <TouchableOpacity style={thesis.mini_item} onPress={() => navigation.navigate('Danh sách khóa luận')}>
                        <View>
                            <View style={thesis.mini_icon}>
                                <MaterialCommunityIcons color="gray" name="update" size={35} />
                            </View>
                            <Text style={thesis.tile}>Danh Sách Khóa Luận</Text>


                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={thesis.mini_item} onPress={() => navigation.navigate('Thêm khóa luận')}>
                        <View>
                            <View style={thesis.mini_icon}>
                                <Octicons color="gray" name="diff-added" size={35} />
                            </View>
                            <Text style={thesis.tile}>Thêm Mới</Text>


                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}

export default Thesis