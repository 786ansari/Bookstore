import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const getAllSocialMediaUrl = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.socialMediaUrl;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.get(url,{},headers)
}