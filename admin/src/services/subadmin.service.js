import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const SubadminAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addSubadmin;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return await curd.post(url,data,headers)
}
export const getPermission =async () => {
    let token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return await curd.get(dataUrl.MainUrl+dataUrl.endPoint.permissions,{},headers)
}
export const getAllSubadmins =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getSubadminList;
    let token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return await curd.post(url,data,headers)
}
export const subadminStatusChange = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeSubadminStatus;
    let token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return await curd.post(url,data,headers)
}
export const subadminDelete = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.subadmindelete;
    let token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return await curd.post(url,data,headers)
}
export const subadminUpdate = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateSubadmin;
    let token  = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        "Authorization":token
    };
    return await curd.post(url,data,headers)
}


// export const NewsListGet = async() => {
//     return await curd.get(dataUrl.MainUrl+dataUrl.endPoint.newsGet,{})
// }
// export const NewsUpdate =async (data) => {
//     return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.newsUpdate,{},data)
// }
// export const NewsDelete =async (data) => {
//     return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.newsDelete,{},data)
// }