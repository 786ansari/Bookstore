import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addSocialMediaurl =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addSocialMediaurl;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
   
    return await curd.post(url,data,headers)
}


export const getSocialMediaurl =async () => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.getSocialMediaurl;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const updateSocialMediaurlById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateSocialMediaurlById;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const deleteSocialMediaurlById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteSocialMediaurlById;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}