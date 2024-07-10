import axios from "axios"
import { HotToaster } from "../utils/Toaster";

export const post = async (url, parameters, headers) => {
    try {
        const response = await axios.post(url, parameters, { headers: headers });
        return response.data;
    } catch (error) {
        // HotToaster(false,error?.response?.data?.message)
        console.log("errorooroor",error.response)
        return error?.response?.data;
    }

};

export const get = async (url, params, headers) => {
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        // HotToaster(false,error?.response?.data?.message)
        return error?.response?.data;
    }
};
