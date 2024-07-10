import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const getSupportService =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllSupportRequest;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return await curd.get(url,{},headers)
}