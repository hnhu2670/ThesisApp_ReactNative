import React, { Fragment, useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';
import MainHeader from '../layout/MainHeader';
import ListFunction from './ListFunction';
import DrawerTab from './DrawerTab';
import styles from '../../assets/js/style';
import { AntDesign, Entypo, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
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

                    <View style={{
                        backgroundColor: color.background,
                        borderTopLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        marginBottom: '3%'

                    }}>
                        <View>
                            {current_user.role === 'student' || current_user.role === 'lecturer' ? <>
                                <ListFunction navigation={navigation} />
                                <Text style={[home.title]}>Chức năng của tôi</Text>
                                {current_user.role === 'student' ? <>
                                    <View style={[home.items]}>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Khóa luận sinh viên')}>
                                            <FontAwesome style={[home.icon]} name='group' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Xem khóa luận tham gia</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Điểm của tôi')}>
                                            <AntDesign style={[home.icon]} name='customerservice' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Điểm của tôi</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </> : <>
                                    <View style={[home.items]}>

                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Hội đồng tham gia')}>
                                            <AntDesign style={[home.icon]} name='customerservice' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Hội đồng tham gia</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Khóa luận giảng viên')}>
                                            <MaterialCommunityIcons style={[home.icon]} name='marker' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Chấm điểm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Tạo file')}>
                                            <FontAwesome style={[home.icon]} name='remove' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Xuất điểm</Text>
                                        </TouchableOpacity>
                                    </View>

                                </>}
                            </> : <>
                                {/* quản lý khóa luận */}
                                <View >
                                    <Text style={[home.title]}>Quản lý khóa luận</Text>
                                    <View style={[home.items]}>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Thêm khóa luận')}>
                                            <MaterialIcons style={[home.icon]} name='addchart' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Thêm khóa luận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Danh sách khóa luận')}>
                                            <MaterialIcons style={[home.icon]} name='update' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Cập nhật khóa luận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Tạo file')}>
                                            <FontAwesome style={[home.icon]} name='remove' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Xuất điểm</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/* quản lý hội đồng */}
                                <View
                                >
                                    <Text style={[home.title]}>Quản lý hội đồng</Text>
                                    <View style={[home.items]}>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => { navigation.navigate("Thêm hội đồng") }}>
                                            <Entypo style={[home.icon]} name='add-to-list' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Thêm hội đồng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => { navigation.navigate("Danh sách hội đồng") }}>
                                            <MaterialIcons style={[home.icon]} name='update' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Cập nhật hồi đồng</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity style={[home.thumb]}>
                                            <FontAwesome style={[home.icon]} name='remove' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Xóa hội đồng</Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity style={[home.thumb]} onPress={() => { navigation.navigate("Danh sách HĐ") }}>
                                            <Entypo style={[home.icon]} name='remove-user' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Xóa thành viên</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Khóa hội đồng')}>
                                            <Feather style={[home.icon]} name='lock' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Khóa hội đồng</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/* quản lý điểm */}
                                {/* <View >
                                    <Text style={[home.title]}>Quản lý điểm</Text>
                                    <View style={[home.items]}>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Danh sách chấm điểm')}>
                                            <MaterialIcons style={[home.icon]} name='addchart' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Nhập điểm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[home.thumb]} onPress={() => navigation.navigate('Bảng điểm')}>
                                            <MaterialIcons style={[home.icon]} name='update' size={30} color={color.green} />
                                            <Text style={[home.infor]}>Bản điểm trung bình</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                            </>}
                        </View>


                    </View>
                </View>
            </ScrollView>

        </View>

    );
};

export default Home