import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const userLogin = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.login;
    const headers = {
    'Content-Type': 'application/json'
};
    return await curd.post(url,data,headers)
}

export const userSignUp = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.signup;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.post(url,data,headers)
}

export const forgotPassword = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.forgotPassword;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.post(url,data,headers)
}

export const getPermotionModal = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPermotionModal;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.get(url,{},headers)
}


