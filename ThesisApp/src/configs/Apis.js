import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_URL = 'http://192.168.1.7:8000';
// const SERVER = "http://192.168.1.7";

const SERVER_URL = 'http://10.17.50.232:8000';
const SERVER = "http://10.17.50.232";

// const SERVER_URL = 'http://10.17.49.245:8000';
// const SERVER = "http://10.17.49.245";


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

    "add-all-member": `${SERVER_URL}/add-all-member/`, //add thành viên hội đồng  
    "get-member": `${SERVER_URL}/get-member-of-committee/`,//edit hội đồng
    "update-committes": (id) => `${SERVER_URL}/update-committee-and-member/${id}/`,

    "score-thesis-students": (id) => `${SERVER_URL}/get-thesis/${id}/student/`,//điểm của sv làm khóa luận
    "get-thesis-score": (id) => `${SERVER_URL}/get-thesis/${id}/score/`,
    "add-or-update-score": `${SERVER_URL}/add-or-update-score/`



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