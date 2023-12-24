import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = 'http://192.168.1.5:8000';
const SERVER = "http://192.168.1.5";

// const SERVER_URL = 'http://10.17.49.55:8000';
// const SERVER = "http://10.17.49.55";


export const endpoints = {
    // 'login': `${SERVER_URL}/o/token/`,//quyền đn
    // "current-user": `${SERVER_URL}/get-user-by-token/`,//user đăng nhập
    // "update-user": (id) => `${SERVER_URL}/users/${id}/`,
    // "criteria": `${SERVER_URL}/criteria/`,//tiêu chí
    // "list-thesis": `${SERVER_URL}/thesis/`,

    'login': `${SERVER_URL}/o/token/`,//quyền đn
    "current-user": `${SERVER_URL}/get-user-by-token/`,//user đăng nhập
    "get-user": (id) => `${SERVER_URL}/get-users/${id}/`,//get user by id
    "update-user": (id) => `${SERVER_URL}/update-user/${id}/`,//update profile
    "criteria": `${SERVER_URL}/get-criteria/`,//tiêu chí
    "list-thesis": `${SERVER_URL}/get-thesis/`,//ds khóa luận
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

export const authApiToken = (token) => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": 'Bearer ' + token
        }
    })
}


export default axios.create({
    baseURL: SERVER
});