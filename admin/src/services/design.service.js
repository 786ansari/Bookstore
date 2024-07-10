import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const addDesign =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addDesign;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getDesign =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getDesign;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const updateDesign =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updateDesign;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type':'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const deleteDesign =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.deleteDesign;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}