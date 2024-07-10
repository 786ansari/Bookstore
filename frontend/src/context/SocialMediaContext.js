import {createContext, useEffect, useState } from "react"
import { getAllSocialMediaUrl } from "../services/socialmedia.service"

export const SocialMediaContext = createContext({})

const SocialMediaProvider = ({children}) => {
    const [social, setSocial] = useState([])

    useEffect(()=>{
        socialMediaUrlGet()
    },[])

    const socialMediaUrlGet = async () => {
        let result = await getAllSocialMediaUrl()
        if(result.status) {
          setSocial(result.data)
        }
      }
      return (
        <SocialMediaContext.Provider value={{social}}>
            {children}
        </SocialMediaContext.Provider>
      )
}
export default SocialMediaProvider