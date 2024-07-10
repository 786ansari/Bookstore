import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addTypingForm = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addTypingForm;
    let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'multipart/form-data',
};
    return await curd.post(url,data,headers)
}