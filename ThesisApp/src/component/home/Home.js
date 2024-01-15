import React, { Fragment } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Header from './Layout/Header';
import home from './style';
import MainHeader from '../layout/MainHeader';
import ListFunction from './ListFunction';
import DrawerTab from './DrawerTab';
import styles from '../../assets/js/style';
import { AntDesign } from '@expo/vector-icons';
import color from '../../assets/js/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
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
                    <ListFunction />
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
                            <Text style={[home.title]}>Chức năng của tôi</Text>
                            <View style={[home.items]}>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                            </View>
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
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
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
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[home.thumb]}>
                                    <AntDesign style={[home.icon]} name='customerservice' size={35} color={color.green} />
                                    <Text style={{ textAlign: 'center', color: color.green }}>CHức năng 1</Text>
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