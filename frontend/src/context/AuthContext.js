import { React, createContext, useEffect, useState } from "react"
import * as profileService from "../services/profile.service"

export const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    useEffect(()=>{
        const token = localStorage.getItem("token")
        // if(!token) return false
        token &&  profile()
      
    },[isLoggedIn])
    const profile = async() => {
        let result = await profileService.userProfile()
        if(result?.status){
            setIsLoggedIn(true)
            setUserProfile(result.data)
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userProfile,
            setIsLoggedIn,
            profile,
            setUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider