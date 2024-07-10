import * as curd from "./curd"
import * as dataUrl  from "./dataurl"
export const CategoryAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
        const url = MainUrl + endPoint.categoryAdd;
    let token = localStorage.getItem("token")
    console.log("toentoken====>>>",token);
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
   
    return await curd.post(url,data,headers)
}
export const CategoryListGet = async() => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.categoryGet;
let token = localStorage.getItem("token")
 const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
};
    return await curd.get(url,{},headers)
}

export const CategoryUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateCategory;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return await curd.post(url,data,headers)
}
export const CategoryDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteCategory;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return await curd.post(url,data,headers)
}
export const CategoryStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeCategoryStatus;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
};
    return await curd.post(url,data,headers)
}
export const BookAdd = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addBookDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const getBookList =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.bookList;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const BookUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateBookDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const BookDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteBookById;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const BookStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeBookStatus ;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type':  'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const PosterAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addPoster;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const getPosterList =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPoster;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const PosterUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updatePoster;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const PosterDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deletePoster;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type':  'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const PosterStatusChange =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changePosterStatus;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const GetAllReviews =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllReview;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const changeReviewStatus =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.changeReviewStatus;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const getCartDetails =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getAllCartInfo;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const setTrendingTitleImage =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.setTrendingTitleImage;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getTrandingTitleImagesData =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getTrandingTitleImagesData;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,{},headers)
}
export const titleImageUpdateById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.titleImageUpdateById;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const titleImageDeleteById =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.titleImageDeleteById;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const PermotiopromotionAndOfferAdd =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addPromotionAndOfferDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const getPromotionAndOfferDetails =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getPromotionAndOfferDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}
export const updatePromotionAndOfferDetails =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updatePromotionAndOfferDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const deletePromotionAndOfferDetails =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deletePromotionAndOfferDetails;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const addBookFiles = async(data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.addBookFiles;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}

export const getBookFiles =async () => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.getBookFiles;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.get(url,{},headers)
}

export const BookFilesUpdate =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.updateBookFiles;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}
export const BookFilesDelete =async (data) => {
    const { MainUrl, endPoint } = dataUrl;
    const url = MainUrl + endPoint.deleteBookFiles;
    let token = localStorage.getItem("token")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    return await curd.post(url,data,headers)
}