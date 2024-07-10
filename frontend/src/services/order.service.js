import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const createOrder = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const token = localStorage.getItem("token")
    const url = MainUrl + endPoint.create_order;
    const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
};
    return await curd.post(url,data,headers)
}

export const capturePayment = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const token = localStorage.getItem("token")
    const url = MainUrl + endPoint.payment_capture;
    const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
};
    return await curd.post(url,data,headers)
}

export const getSubscriptionPlan = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const token = localStorage.getItem("token")
    const url = MainUrl + endPoint.get_subscription_plans;
    const headers = {
    'Content-Type': 'application/json',
    "Authorization":token
};
    return await curd.get(url,{},headers)
}





