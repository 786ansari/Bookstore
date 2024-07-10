import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const addPermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addPermotionPopupData;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getPermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPermotionPopupData;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const updatePermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updatePermotionPopupData;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const removePermotionPopupData =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.removePermotionPopupData;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}