import * as curd from "./curd"
import * as dataUrl  from "./dataurl"

export const CategoryListGet = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.categoryGet;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json'
};
    return await curd.get(url,{},headers)
}

export const bookListGet = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getBookList;
    let token = localStorage.getItem("token")
    const headers = {
       'Content-Type': 'application/json'
    };
    return await curd.get(url,{},headers)
}

export const getBookContent = async(id) => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getBookContentById+"/"+id;
  let token = localStorage.getItem("token")
  const headers = {
     'Content-Type': 'application/json'
  };
  return await curd.get(url,{},headers)
}

export const getBookContentFileByID = async(data) => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getBookContentFileById;
  let token = localStorage.getItem("token")
  const headers = {
     'Content-Type': 'application/json'
  };
  return await curd.post(url,data,headers)
}


export const getBooksAccordingToCategory = async(data) => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getBooksByCategory;
  let token = localStorage.getItem("token")
  const headers = {
     'Content-Type': 'application/json'
  };
  return await curd.post(url,data,headers)
}

export const posterListGet = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPoster;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.get(url,{},headers)
}

export const addBookToCart = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    let url
    let token = localStorage.getItem("token")
    if(token){
        url = MainUrl + endPoint.addToCartByUserId;
    }
    else{
        url = MainUrl + endPoint.addToCart;
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const getBookFromCart = async() => {
    const { MainUrl, endPoint } = dataUrl;
    let token = localStorage.getItem("token")
    let url
    if(token){
        url  = MainUrl + endPoint.getBookFromCartByUserId;
    }
    else{
        url  = MainUrl + endPoint.getBooksFromCart;
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const removeItemFromCart = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.removeItem;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.post(url,data,headers)
}
export const getPromotionAndOffer = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.promotionAndOffer;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.get(url,{},headers)
}

export const trendingTitleAndImages = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.trendingTitleAndImages;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.get(url,{},headers)
}
export const AdminInformation = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.adminInformation;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.get(url,{},headers)
}
export const BookDetailsById = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.bookDetailsById;
    let token = localStorage.getItem("token")
    const headers = {
      'Content-Type': 'application/json'
    };
    return await curd.post(url,data,headers)
}
export const getCartTotalAmountAndQuentity = async() => {
  const { MainUrl, endPoint } = dataUrl;
  let url 
  let token = localStorage.getItem("token")
  if(token){
    url = MainUrl + endPoint.getcarttotalamountandquentityyuserid;
  }
  else{
    url = MainUrl + endPoint.getcarttotalamountandquentity
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  return await curd.get(url,{},headers)
}
export const getAllEbooks = async(data) => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getAllEbooks;
let token = localStorage.getItem("token")
const headers = {
  'Content-Type': 'application/json'
};
  return await curd.post(url,data,headers)
}

export const FlashMessageGet = async() => {
  const { MainUrl, endPoint } = dataUrl;
  const url = MainUrl + endPoint.getFlashMessages;
  let token = localStorage.getItem("token")
  const headers = {
    'Content-Type': 'application/json'
  };
  return await curd.get(url,{},headers)
}