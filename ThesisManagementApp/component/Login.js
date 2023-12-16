import React, { useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet } from 'react-native'
import styles from '../resources/js/style';
import img from '../resources/images/login.png'
import { useEffect } from 'react';

const Login = () => {
    const [criteria, setCriteria] = useState([])

    const userCriteria = async () => {


        await fetch('https://reactnative.dev/movies.json')
            .then(response => response.json())
            .then(json => {
                setCriteria(json.movies);
            })
            .catch(error => {
                console.error(error);
            });
        //     console.log("loading..............")
        //     // const url = "http://127.0.0.1:8000/api/criteria/";
        //     // const headers = {
        //     //     Authorization: "Bearer E5rtoEDqecWdrIY0EAgSfTtVePCi5k",
        //     //     'Content-Type': 'application/json',


        //     // };

        //     // const response = await fetch(url, { method: 'GET', headers });
        //     // const response = await fetch(url);

        //     const response = await fetch('http://127.0.0.1:8000/api/criteria/', {
        //         method: 'GET',
        //         headers: {
        //             Authorization: "Bearer E5rtoEDqecWdrIY0EAgSfTtVePCi5k",
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         }
        //     });

        //     if (response.status === 200) {
        //         const result = await response.json();
        //         setCriteria(result);
        //     } else {
        //         throw new Error(response.statusText);
        //     }


    }

    useEffect(() => {
        userCriteria();
        // getMovies();
    }, []);

    return (
        <View style={styles.container}>
            <View style={login.top}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={[login.image]}
                        source={img} />
                    <Text
                        style={{ color: "#fff", fontSize: 20, verticalAlign: "middle", marginLeft: -150 }}
                    >Welcome</Text>
                </View>

                <Text
                    style={{ color: "#fff", fontSize: 45, marginTop: -140, marginLeft: 30 }}
                >Thesis App</Text>

            </View>
            <View style={login.bottom}>
                <View style={login.text_input}>
                    <Text style={[login.text]}>Tên đăng nhập</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Tên đăng nhập'
                    />
                </View>
                <View style={login.text_input}>
                    <Text style={login.text}>Mật khẩu</Text>
                    <TextInput
                        style={login.input}
                        placeholder='Mật khẩu'
                    />
                </View>

                <View style={login.text_input}>
                    <Text style={login.button}>ĐĂNG NHẬP</Text>

                </View>

                <View style={[login.text_input, login.link]}>
                    <Text style={[login.text, login.text_link]}>Đăng ký</Text>
                    <Text style={[login.text, login.text_link]}>Quên mật khẩu</Text>
                </View>
                <View style={[login.text_input, login.link]}>
                    {criteria ? <Text style={{ color: "gold" }}>{criteria.title} thành công</Text> : <Text>Lỗi</Text>}

                </View>
            </View>

        </View>


    )
}


// css
const login = StyleSheet.create({
    top: {
        // marginTop: "10%",
        // paddingTop: "5%",
        height: "40%",
        width: "100%",
        // backgroundColor: "red"
    },
    bottom: {
        backgroundColor: "#ffff",
        height: "60%",
        width: "100%"
    },
    text_input: {
        marginTop: 30,
        marginLeft: 30
    },
    input: {
        height: 50,
        marginTop: 10,
        marginRight: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "#2d665f"
    },
    text: {
        color: "#2d665f"
    },
    button: {
        height: 45,
        marginTop: 10,
        marginRight: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#2d665f",
        color: "#ffff",
        fontWeight: "bold",
        borderColor: "#2d665f"

    },
    link: {
        flexDirection: 'row',
        width: "80%",
        justifyContent: "space-between",
        marginTop: 40
    },
    text_link: {
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    },
    image: {
        marginLeft: -230,
        width: "130%",
        height: 300,
        opacity: 0.3
    }
});
export default Login