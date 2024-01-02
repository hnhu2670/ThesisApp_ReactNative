import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_URL = 'http://192.168.1.6:8000';
// const SERVER = "http://192.168.1.6";

const SERVER_URL = 'http://172.16.17.198:8000';
const SERVER = "http://172.16.17.198";


export const endpoints = {
    'login': `${SERVER_URL}/o/token/`,//quyền đn
    "current-user": `${SERVER_URL}/get-user-by-token/`,//user đăng nhập
    "get-user": (id) => `${SERVER_URL}/get-users/${id}/`,//get user by id
    "get-user-role": `${SERVER_URL}/get-users/`,//get user by id
    "update-user": (id) => `${SERVER_URL}/update-user/${id}/`,//update profile

    "criteria": `${SERVER_URL}/get-criteria/`,//tiêu chí

    "add-thesis": `${SERVER_URL}/add-thesis/`,
    "update-thesis": (id) => `${SERVER_URL}/update-thesis/${id}/`,
    "get-thesis": (id) => `${SERVER_URL}/get-thesis/${id}/`,
    "list-thesis": `${SERVER_URL}/get-thesis/`,//ds khóa luận,

    "list-committes": `${SERVER_URL}/get-committee/`,//ds khóa luận,
    "edit-committes": (id) => `${SERVER_URL}/get-committee/${id}/`,//edit khoa luận

    "check-old-password": `${SERVER_URL}/check-old-password/`,//kiem tra pass cu
    "forgot-password": `${SERVER_URL}/forgot-password/`,

}

let token;

const getToken = async () => {
    token = await AsyncStorage.getItem('token');
};

getToken();

export const authApiToken = (token) => {
    // console.log('token', token)
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": 'Bearer' + ' ' + token
        }
    })
}


export default axios.create({
    baseURL: SERVER
});