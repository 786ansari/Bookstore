import React, {useState, useEffect} from "react";
import { changePassword } from "../../services/profile.service";
import { HotToaster } from "../../utils/Toaster";

const ChangePassword = () => {
    const [passwordData,setPasswordData] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    })
    const handleChange = (e) => {
        let { name,value } = e.target
            setPasswordData(preState=>({
                ...preState,
                [name]:value
            }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const result = await changePassword(passwordData)
        HotToaster(result?.status,result?.message)
    }
    return(
          <div className="change-password">
              <div className="change-pass-inner">

                  <div className="change-ins">
                      <h3>Change Your Password Here</h3>
                     <div className="change-form">
                        <form onSubmit={handleSubmit}>
                        <label>Old Password</label>
                               <input type="password" name="oldPassword" onChange={handleChange} value={passwordData?.oldPassword} />
                               <label>New Password</label>
                               <input type="password" name="newPassword" onChange={handleChange} value={passwordData?.newPassword} />
                               <label>Confirm Password</label>
                               <input type="password" name="confirmPassword" onChange={handleChange} value={passwordData?.confirmPassword} />
                               <input type="submit" name="submit" value="submit"  className="sub-but"/>
                        </form>
                     </div>
                  </div>
                 
              </div>
          </div>
    );
};

export default ChangePassword;