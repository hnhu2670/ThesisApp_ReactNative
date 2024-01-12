import React, { Fragment, useContext } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import styles from '../../assets/js/style'
import thesis from './style'
import Header from '../layout/Header'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Thesis = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
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
            {current_user.role === 'admin' || current_user.role === 'universityadministrator' ? <>
                <TouchableOpacity style={thesis.items} onPress={() => navigation.navigate('Danh sách khóa luận')}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <Entypo color={color.green} name="list" size={30} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Cập Nhật Khóa Luận</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={thesis.items} onPress={() => navigation.navigate('Thêm khóa luận')}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <Octicons name="diff-added" size={30} color={color.green} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Thêm Khóa Luận Mới</Text>
                        </View>
                    </View>

                </TouchableOpacity>

            </> : <>
                <TouchableOpacity style={thesis.items} onPress={() => navigation.navigate('Danh sách khóa luận')}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <Entypo color={color.green} name="list" size={30} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Danh Sách Khóa Luận</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={thesis.items}>
                    <View style={thesis.list}>
                        <View style={thesis.mini_icon}>
                            <MaterialIcons
                                color={color.green} name="my-library-books" size={30} />
                        </View>
                        <View style={{ width: '80%', justifyContent: 'center' }}>
                            <Text style={thesis.tile}>Khóa Luận Tham Gia</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </>}
        </View>


    )
}

export default Thesis