import React, { Fragment, useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';
import MainHeader from '../layout/MainHeader';
import ListFunction from './ListFunction';
import DrawerTab from './DrawerTab';
import styles from '../../assets/js/style';
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import color from '../../assets/js/color';
import { MyUserContext } from '../../../App';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);

    return (
        <View>
            <MainHeader navigation={navigation} />
            <ScrollView
                style={{
                    backgroundColor: 'white',
                    height: windowHeight * 0.73,
                    marginVertical: 10,
                    // marginBottom: 50
                }}
            >
                <View style={[styles.container]}>
                    <ListFunction navigation={navigation} />
                    <View style={{
                        backgroundColor: color.background,
                        borderTopLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        marginBottom: '3%'

                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: 'lightgray'
                        }}>
                            {current_user.role === 'student' || current_user.role === 'lecturer' ? <>
                                <Text style={[home.title]}>Chức năng của tôi</Text>
                                {current_user.role === 'student' ? <>
                                    <View style={[home.items]}>
                                        <TouchableOpacity style={[home.thumb]}>
                                            <FontAwesome style={[home.icon]} name='group' size={35} color={color.green} />
                                            <Text style={{ textAlign: 'center', color: color.green }}>Khóa luận tham gia</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]}>
                                            <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                            <Text style={{ textAlign: 'center', color: color.green }}>Điểm của tôi</Text>
                                        </TouchableOpacity>
                                    </View>
                                </> : <>
                                    <View style={[home.items]}>

                                        <TouchableOpacity style={[home.thumb]}>
                                            <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                            <Text style={{ textAlign: 'center', color: color.green }}>Hội đồng tham gia</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]}>
                                            <MaterialCommunityIcons style={[home.icon]} name='marker' size={35} color={color.green} />
                                            <Text style={{ textAlign: 'center', color: color.green }}>Chấm điểm</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>}
                            </> : <></>}
                        </View>
                        {/* quản lý hội đồng */}
                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: 'lightgray'
                        }}>
                            <Text style={[home.title]}>Quản lý hội đồng</Text>
                            <View style={[home.items]}>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Thêm hội đồng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Cập nhật hồi đồng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Cập nhật tên</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Xóa hội đồng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Xóa thành viên</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        {/* quản lý khóa luận */}
                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: 'lightgray'
                        }}>
                            <Text style={[home.title]}>Quản lý khóa luận</Text>
                            <View style={[home.items]}>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Thêm khóa luận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Cập nhật khóa luận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>Loại bỏ khóa luận</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>

    );
};

export default Home