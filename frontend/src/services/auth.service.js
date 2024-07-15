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

export const getOtp = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getOtp;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json'
    };
    return await curd.post(url,data,headers)
} 
export const otpVerification = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.verifyOtp;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json'
    };
    return await curd.post(url,data,headers)
} 

export const changeForgotPassword = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeforgotPassword;
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


