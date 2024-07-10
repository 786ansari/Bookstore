import React, { createContext, useEffect, useState } from 'react'
import { AdminInformation } from '../services/book.service';

export const AdminContext = createContext({})

const AdminProvider = ({children}) => {
    const [adminInfo, setAdminInfo] = useState({})

    useEffect(()=>{
        getDetails()
    },[])
    const getDetails = async() => {
        let result = await AdminInformation()
        if(result?.status){
            setAdminInfo(result?.data[0])
        }
    }
    return (
        <AdminContext.Provider value={{
            adminInfo
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider