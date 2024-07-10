import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import {forgotPassword} from "../../../services/auth.service"
import { HotToaster } from "../../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"
const ForgotPassword  = (props) => {
    const [signId, setSignId] = useState("")
    const [password, setPassword] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const {setIsLoggedIn,
            setUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        setIsOpen(props.forgotModal)
  },[props])
    
      const handleCloseDialogForgot = (event, reason) => {
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
          emailId:signId
        }
        let result = await forgotPassword(data)
        console.log("resultresult",result)
        HotToaster(result.status,result.message)
        if(result.status){
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
                  <form>
                    <div>
                        {
        console.log("propsorpsorpsorps===>>>",props)
                        }
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
                              onChange={handleChange}
                              placeholder="E-mail / Mobile"
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
                            onClick={handleForgotPassword}
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
                  </form>
                </div>
              </div>
            </div>
           
          </DialogContent>
        
          </Dialog>

   
    )
}
export default ForgotPassword