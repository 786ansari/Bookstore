import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const currentAffairsFileAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addCurrentAffairs;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const currentAffairsFileGet =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getCurrentAffairs;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const currentAffairsFileUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateCurrentAffairs;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const currentAffairsFileDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteCurrentAffairs;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}