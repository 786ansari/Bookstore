import React, { createContext, useEffect, useState } from 'react'
import { AdminInformation, CategoryListGet } from '../services/book.service';
import { useNavigate } from 'react-router-dom';

export const CategoryContext = createContext({})

const CategoryProvider = ({children}) => {
    const [categoryList, setCategoryList] = useState({})
    const [page, setPage] = useState("")
    const [type, setType] = useState("")


    useEffect(()=>{
        getDetails()
    },[])
    const getDetails = async() => {
        let result = await CategoryListGet();
        let pathname = window.location.pathname
        if(pathname == "/"){
            pathname = "books"
            setType("banner_right")
        }
        setPage(pathname)
        if(result?.status){
            setCategoryList(result.data)
        }
    }
    return (
        <CategoryContext.Provider value={{
            categoryList,
            page,
            type
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider