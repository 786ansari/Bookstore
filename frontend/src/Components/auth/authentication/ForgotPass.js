import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import {changeForgotPassword, forgotPassword, getOtp, otpVerification} from "../../../services/auth.service"
import { HotToaster } from "../../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"
const ForgotPassword  = (props) => {
    const [signId, setSignId] = useState("")
    const [otp, setOtp] = useState("")
    const [isOtpSend, setIsOtpSend] = useState(false)
    const [isOtpVerify, setIsOtpVerify] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState("")

    
    useEffect(()=>{
        setIsOpen(props.forgotModal)
  },[props])
    
      const handleCloseDialogForgot = (event, reason) => {
        setOtp("")
        setIsOtpSend(false)
        setIsOtpVerify(false)
        setPassword("")
        setCPassword("")
        props.setForgotModal(false)
      };

      const handleChange = (e) => {
        let {name,value} = e.target
        if(name == "lemail"){
          setSignId(value)
        }
        // else{
        //   setPassword(value)
        // }
      }
      const handleForgotPassword = async(e) => {
        e.preventDefault()
        let data = {
          otpkey:signId
        }
        let result = await getOtp(data)
        console.log("resultresult",result)
        HotToaster(result.status,result.message)
        if(result.status){
          setIsOtpSend(true)
          setOtp(result?.data)
          // HotToaster(result.status,result.message)
        }
        
      }
      const verifyOtp = async(e) => {
        e.preventDefault()
        let data = {
          otp:otp,
          otpkey:signId
        }
        let result = await otpVerification(data)
        console.log("resultresult",result)
        HotToaster(result.status,result.message)
        if(result.status){
          setIsOtpVerify(true)
          // HotToaster(result.status,result.message)
        }
        
      }
      const handleChangePassword = async(e) => {
        e.preventDefault()
        let data = {
          password:password,
          cpassword:cpassword,
          otpkey:signId
        }
        let result = await changeForgotPassword(data)
        console.log("resultresult",result)
        HotToaster(result.status,result.message)
        if(result.status){
          handleCloseDialogForgot()
          // HotToaster(result.status,result.message)
        }
        
      }
    //   const signUpModal = () => {
    //     props.modalClose("login",false)
    //     props.modalClose("signup",true)
    //   }
    return (
        <Dialog open={props?.forgotModal} onClose={handleCloseDialogForgot} >
        {/* <DialogTitle>Dialog Title</DialogTitle> */}
        <DialogActions>
          <Button onClick={handleCloseDialogForgot}>Close</Button>
        </DialogActions>
        <DialogContent>
            <div id="fancybox-wrap" className="loginpop fl borR log-img">
              <div className="left form-style rs bgw">
                <div className="ab-image">
                  <div className="ab-image-inner"></div>
                </div>
                <div className="w100 fl">
                  {!isOtpVerify?
                  <form>
                    <div>
                      <div className="log-top">
                        <div className="log-top-inner">
                          <h3>Welcome!</h3>
                          <p>
                            Forgot Your Password? No Worries! 
                            Just Follow The Simple Step Step And Get Your Account Back
                          </p>
                        </div>
                      </div>
                      <div className="w100 fl">
                        <span className="pb5 fl log-in w100">
                          <b className="pb5 fl w100">
                            <input
                              type="text"
                              title="Email Address"
                              required
                              className="w100"
                              id="lemail"
                              name="lemail"
                              value={signId}
                              onChange={handleChange}
                              placeholder="E-mail / Mobile"
                            />
                          </b>{" "}
                        </span>
                      </div>
                      {isOtpSend && <div className="w100 fl">
                        <span className="pb5 fl log-in w100">
                          <b className="pb5 fl w100">
                            <input
                              type="number"
                              title="Otp"
                              required
                              className="w100"
                              id="lemail"
                              name="lemail"
                              value={otp}
                              onChange={(e)=>setOtp(e.target.value)}
                              placeholder="Enter otp"
                            />
                          </b>{" "}
                        </span>
                      </div>}
                      <div
                        style={{ textAlign: "center" }}
                        className="red"
                        id="lmsg"
                      ></div>
                      <div className="w100 fl">
                        <b className="pb5 fl ar">
                          <input
                            type="submit"
                            value="Submit"
                            className="logpop"
                            onClick={!isOtpSend?handleForgotPassword:verifyOtp}
                          />
                          <span className="fa-right">
                            {" "}
                            {/* <FontAwesomeIcon icon={faLongArrowRight} /> */}
                          </span>
                        </b>
                      </div>
                      {/* <p className="notemsg w100 fl" >
                        If you haven’t created your account yet, please{" "}
                        <a   onClick={signUpModal}>Signup here</a>.
                      </p> */}
                    </div>
                  </form>:
                   <form>
                   <div>
                     <div className="log-top">
                       <div className="log-top-inner">
                         <h3>Welcome!</h3>
                         <p>
                           Change Your Password! 
                         </p>
                       </div>
                     </div>
                     <div className="w100 fl">
                       <span className="pb5 fl log-in w100">
                         <b className="pb5 fl w100">
                           <input
                             type="text"
                             title="New Password"
                             required
                             className="w100"
                             id="lemail"
                             name="lemail"
                             value={password}
                             onChange={(e)=>{
                              setPassword(e.target.value)
                             }}
                             placeholder="Enter new password"
                           />
                         </b>{" "}
                       </span>
                     </div>
                     <div className="w100 fl">
                       <span className="pb5 fl log-in w100">
                         <b className="pb5 fl w100">
                           <input
                             type="text"
                             title="cpassword"
                             required
                             className="w100"
                             id="lemail"
                             name="lemail"
                             value={cpassword}
                             onChange={(e)=>{
                              setCPassword(e.target.value)
                             }}
                             placeholder="Enter confirm password"
                           />
                         </b>{" "}
                       </span>
                     </div>
                     <div
                       style={{ textAlign: "center" }}
                       className="red"
                       id="lmsg"
                     ></div>
                     <div className="w100 fl">
                       <b className="pb5 fl ar">
                         <input
                           type="submit"
                           value="Submit"
                           className="logpop"
                           onClick={handleChangePassword}
                         />
                         <span className="fa-right">
                           {" "}
                           {/* <FontAwesomeIcon icon={faLongArrowRight} /> */}
                         </span>
                       </b>
                     </div>
                     {/* <p className="notemsg w100 fl" >
                       If you haven’t created your account yet, please{" "}
                       <a   onClick={signUpModal}>Signup here</a>.
                     </p> */}
                   </div>
                 </form>}
                </div>
              </div>
            </div>
           
          </DialogContent>
        
          </Dialog>

   
    )
}
export default ForgotPassword