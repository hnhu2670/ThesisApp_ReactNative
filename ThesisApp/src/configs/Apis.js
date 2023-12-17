import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_CONTEXT = "/IMPROOK_CARE";
// const SERVER = "http://192.168.1.134";
// const DJANGO_SERVER = "http://192.168.1.134:8000"

const SERVER_URL = 'http://192.168.1.11:8000';
const SERVER = "http://192.168.1.11";

export const endpoints = {
    'login': `${SERVER_URL}/o/token/`,//quyền đn
    "current-user": `${SERVER_URL}/get-user-by-token/`,//user đăng nhập
    "users": `${SERVER_URL}/users/`,
    "criteria": `${SERVER_URL}/criteria/`,//tiêu chí
}

let token;

const getToken = async () => {
    token = await AsyncStorage.getItem('token');
};

getToken();

export const authApi = (token) => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": token
        }
    })
}


export default axios.create({
    baseURL: SERVER
});