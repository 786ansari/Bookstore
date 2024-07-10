import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const getCurrentAffairs = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getCurrentAffairs;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.post(url,data,headers)
}

export const checkSubsciption = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.checkSubscriptionForCa;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
};
    return await curd.post(url,data,headers)
}