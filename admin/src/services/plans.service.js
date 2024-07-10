import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const addSubscriptionPlans =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.addPlans;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getSubscriptionPlans =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPlans;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const updateSubscriptionPlans =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.updatePlans;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const removeSubscriptionPlans =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.removePlans;
    let token = localStorage.getItem("token")
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}