import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const getAllDataTranslateQuery =async () => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.getAllDataTranslateQuery;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}