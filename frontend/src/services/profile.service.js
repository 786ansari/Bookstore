import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const userProfile = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.profile;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return await curd.get(url,{},headers)
}

export const setProfileData = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.setProfile;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return await curd.post(url,data,headers)
}


export const changePassword = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changePassword;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
    };
return await curd.post(url,data,headers)
}

export const updateUsersEmailAndMobile = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateEmailMobile;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
        };
return await curd.post(url,data,headers)
}