import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addDataTranslateFormDetails = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addDataTranslate;
    let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'multipart/form-data',
};
    return await curd.post(url,data,headers)
}