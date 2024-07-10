import React, {useState, useEffect} from "react";
import { HotToaster } from "../../utils/Toaster";
import { updateUsersEmailAndMobile } from "../../services/profile.service";

const UpdateMobileEmail = () =>{
    const [info,setInfo] = useState({
        emailId:"",
        mobileNumber:""
        })


    const handleChange = (e) => {
        let { name,value } = e.target
        setInfo(prevState=>({
            ...prevState,
            [name]:value
        }))

    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const result = await updateUsersEmailAndMobile(info)
        HotToaster(result?.status,result?.message) 

    }
    return(
        <div className="change-password">
        <div className="change-pass-inner">

            <div className="change-ins">
                <h3>Update Mobile and Email</h3>
               <div className="change-form">
                  <form onSubmit={handleSubmit}>
                         <label>Email</label>
                         <input type="email" name="emailId" value={info?.emailId} onChange={handleChange} />
                         <label>Mobile Number</label>
                         <input type="tel" name="mobileNumber" value={info?.mobileNumber} onChange={handleChange} />
                         <input type="submit" name="submit" value="submit" className="sub-but"/>
                  </form>
               </div>
            </div>
           
        </div>
    </div>
    );
};
export default UpdateMobileEmail;