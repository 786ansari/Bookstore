import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const addFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addFlashMessage;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getFlashMessage;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const updateFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateFlashMessage;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type':'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const removeFlash =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.removeFlashMessage;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}