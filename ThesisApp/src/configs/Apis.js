import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = 'http://192.168.1.2:8000';
const SERVER = "http://192.168.1.2";
// const SERVER_URL = 'http://192.168.1.19:8000';
// const SERVER = "http://192.168.1.19";
// const SERVER_URL = 'http://172.16.17.180:8000';
// const SERVER = "http://172.16.17.180";

// const SERVER_URL = 'http://10.17.49.245:8000';
// const SERVER = "http://10.17.49.245";


export const endpoints = {
    'login': `${SERVER_URL}/o/token/`,//quyền đn
    "current-user": `${SERVER_URL}/get-user-by-token/`,//user đăng nhập
    "get-user": (id) => `${SERVER_URL}/get-users/${id}/`,//get user by id
    "get-user-role": `${SERVER_URL}/get-users/`,//get user by id
    "update-user": (id) => `${SERVER_URL}/update-user/${id}/`,//update profile
    "check-old-password": `${SERVER_URL}/check-old-password/`,//ktra mật khẩu cũ
    "thesis-of-user": (id) => `${SERVER_URL}/get-users/${id}/thesis`,//khóa luận mà sv tham gia ==> id sv
    "committee-of-user": (id) => `${SERVER_URL}/get-users/${id}/committee`,//hội đồng mà gv tham gia

    "criteria": `${SERVER_URL}/get-criteria/`,//tiêu chí

    "add-thesis": `${SERVER_URL}/add-thesis/`,
    "update-thesis": (id) => `${SERVER_URL}/update-thesis/${id}/`,
    "get-thesis": (id) => `${SERVER_URL}/get-thesis/${id}/`,
    "list-thesis": `${SERVER_URL}/get-thesis/`,//ds khóa luận,
    "thesis-of-lecturer": `${SERVER_URL}/get-thesis/lecturer`,//ds khóa luận của gv,

    "list-committes": `${SERVER_URL}/get-committee/`,//ds hội đồng,
    "edit-committes": (id) => `${SERVER_URL}/get-committee/${id}/`,//edit khoa luận
    "close-committes": (id) => `${SERVER_URL}/get-committee/${id}/close/`,//edit khoa luận

    "check-old-password": `${SERVER_URL}/check-old-password/`,//kiem tra pass cũ
    "forgot-password": `${SERVER_URL}/forgot-password/`,

    "add-all-member": `${SERVER_URL}/add-all-member/`, //add thành viên hội đồng  
    "get-member": `${SERVER_URL}/get-member-of-committee/`,//edit hội đồng
    "get-member-of-committee": (id) => `${SERVER_URL}/get-member-of-committee/${id}/`,//id này của ai ??????
    // "update-committes": (id) => `${SERVER_URL}/update-committee-and-member/${id}/`,
    "update-committes": (id) => `${SERVER_URL}/get-committee/${id}/update-member/`,
    "update-name-committes": (id) => `${SERVER_URL}/update-committee/${id}/`,
    "delete-member-of-committee": (id) => `${SERVER_URL}/delete-member-of-committee/${id}/`,

    "score-thesis-students": (id) => `${SERVER_URL}/get-thesis/${id}/student/`,//điểm của sv làm khóa luận
    "get-thesis-score": (id) => `${SERVER_URL}/get-thesis/${id}/score/`,
    "add-or-update-score": `${SERVER_URL}/add-or-update-score/`,
    "close-thesis": (id) => `${SERVER_URL}/close-thesis/${id}/`,
    "score-of-student": (id) => `${SERVER_URL}/get-thesis/${id}/score-total/`,
    "detail-score": (id) => `${SERVER_URL}/get-thesis/${id}/detail-score/`



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