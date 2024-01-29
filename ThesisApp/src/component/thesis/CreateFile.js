import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { endpoints } from '../../configs/Apis'
import { AntDesign } from '@expo/vector-icons'
import Search from '../layout/Search'
import color from '../../assets/js/color'
import { MyUserContext } from '../../../App'
import styles from '../../assets/js/style'
import WebView from 'react-native-webview'
import InAppBrowser from 'react-native-inappbrowser-reborn'

const CreateFile = ({ navigation }) => {
    const [current_user, dispatch] = useContext(MyUserContext);
    // const { name } = route.params;
    const [list, setList] = useState('')
    const [filter, setFilter] = useState([])
    const getListThesis = async () => {
        const res = await axios.get(endpoints["list-thesis"])

        if (res.status === 200) {
            const result = await res.data;
            setList(result);

        } else {
            throw new Error(res.statusText);
        }
    }
    // const createPdf = async (id) => {
    //     // const res = await axios.get(endpoints["pdf"](id))
    //     // console.log('data', res.data)
    //     // // alert(

    //     // //     <TouchableOpacity>
    //     // //         res.data
    //     // //     </TouchableOpacity>
    //     // // )
    //     navigation.navigate('Xuất file', { id })

    // }
    const [file, setFile] = useState(null)

    const createPdf = async (id) => {
        const res = await axios.get(endpoints["pdf"](id))
        console.log('data', res.data)
        // setFile(res.data)
        try {
            await InAppBrowser.open('http://192.168.1.2:8000/static/media/thesis1.pdf', {
                // Các tùy chọn có thể được cấu hình tại đây
                // Ví dụ: toolbarColor, showTitle
            });
            console.log('thành công')
        } catch (error) {
            console.error('Lỗi mở trình duyệt:', error.message);
        }
        // return res.data
    }
    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity key={item.id} onPress={() => { createPdf(item.id) }}>
                    <View style={list_thesis.row}>
                        <View style={list_thesis.left}>
                            <Text style={list_thesis.text}>{item.id}</Text>
                        </View>
                        <View style={list_thesis.right}>
                            <Text style={list_thesis.name}>{item.name}</Text>
                        </View>


                    </View>
                </TouchableOpacity>
            </>
        );
    }
    const handlePress = async () => {
        const data = await createPdf()
        console.log(data)
        try {
            await InAppBrowser.open(data, {
                // Các tùy chọn có thể được cấu hình tại đây
                // Ví dụ: toolbarColor, showTitle
            });
            console.log('thành công')
        } catch (error) {
            console.error('Lỗi mở trình duyệt:', error.message);
        }
    };
    const searchName = (text) => {
        const filterName = list.filter((item) =>
            // toLowerCase() chuyá»ƒn chá»¯ hoa thÃ nh thÆ°á»ng
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        // setCommittees(filterName);
        setFilter(filterName)
        console.log('Search text:', text);

    };
    useEffect(() => {
        getListThesis();
        // createPdf()
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: color.background, height: '80%' }]}>
            <View>
                <TouchableOpacity onPress={handlePress}>
                    <Text>Mở trang web</Text>
                </TouchableOpacity>
            </View>

            <View style={list_thesis.container}>
                <View style={list_thesis.top}>
                    <Text style={{
                        marginVertical: 10,
                        color: 'gray',
                        fontStyle: 'italic'
                    }}>Thông tin khóa luận !!!</Text>
                    <Search onSearch={searchName} />
                </View>
                <View style={list_thesis.bottom}>
                    {list.length < 1 ? (
                        <ActivityIndicator size={30} color={color.green} />
                    ) : (<FlatList
                        data={filter.length > 0 ? filter : list}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                    )}
                </View>

            </View>

        </View>

    )

}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const list_thesis = StyleSheet.create({
    container: {
        margin: 10,
    },
    top: {
        height: 'auto',
        marginBottom: '3%',
        // marginHorizontal: 20
    },
    bottom: {
        height: windowHeight * 0.7,
        marginVertical: '3%'
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 0.85,
    },
    right: {
        flexDirection: 'row',
        width: '90%',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#d0eacef5',
        // backgroundColor: '#e1eee0e8',
        backgroundColor: '#dde8dcfc',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    left: {
        width: "13%",
        height: 80,
        marginRight: -15,
        position: 'relative',
        zIndex: 99
    },
    text: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: "#2d665f",
        color: "#FFFF",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 10,

    },
    name: {
        width: "90%",
        color: "#2d665f",
        // color: "black",
        fontSize: 16
    },
    edit: {
        textAlign: "right",
        justifyContent: "center",
    }
})
export default CreateFile