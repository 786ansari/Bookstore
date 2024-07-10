import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
    const params = useParams()
    console.log("paramsparams",params.id)

    useEffect(()=>{
        // getBooks()
    },[])
    const getBooks = async() =>{
        let result = await getBooks()
    }
    
    return(
        <h4>Helllo Category Page</h4>
    )
}
export default CategoryPage