import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import {userLogin} from "../../../services/auth.service"
import { HotToaster } from "../../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"
import ForgotPassword from "./ForgotPass";
const Login  = (props) => {
    const [signId, setSignId] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const {
      isLoggedIn,
      userProfile,
      setIsLoggedIn,
      setUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
      setIsOpenLogin(props.isOpenLogin)
  },[props])
    
      const handleCloseDialogLogin = (event, reason) => {
        console.log("event, reason",event, reason)
        props.modalClose("login",false)
        setIsOpenLogin(false);
      };

      const handleChange = (e) => {
        let {name,value} = e.target
        if(name == "lemail"){
          setSignId(value)
        }
        else{
          setPassword(value)
        }
      }
      const handleLogin = async(e) => {
        e.preventDefault()
        let data = {
          emailId:signId,
          password:password
        }
        let result = await userLogin(data)
        HotToaster(result.status,result.message)
        if(result?.status){
          setIsLoggedIn(true)
          setUserProfile(result.data.profile)
          handleCloseDialogLogin()
          localStorage.setItem("token",result.data.token)
          localStorage.setItem("emailId",result.data.emailId || result.data.mobileNumber)
          localStorage.setItem("name",result.data.name)
          navigate("/");
        }
      }
      const signUpModal = () => {
        props.modalClose("login",false)
        props.modalClose("signup",true)
      }
      const handlePasswordModal = () => {
        setIsPasswordModalOpen(true)
        // props.modalClose("login",false)
        // setIsOpenLogin(false)
      }
    return (
        <Dialog open={isOpenLogin} onClose={handleCloseDialogLogin} >
        {/* <DialogTitle>Dialog Title</DialogTitle> */}
        <DialogActions>
          <Button onClick={handleCloseDialogLogin}>Close</Button>
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
                      <div className="log-top">
                        <div className="log-top-inner">
                          <h3>Welcome back!</h3>
                          <p>
                            For a better experience please Login, or Signup if
                            you haven’t already. Your registration on the old
                            website will not be valid in the new website. To use
                            the features included in the new website, both new
                            and old candidates will have to re-register.
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
                      <div className="w100 fl">
                        <b className="pb5 fl w100">
                          <input
                            type="password"
                            title="Password"
                            required
                            className="w100 log-in"
                            id="lpassword"
                            name="lpassword"
                            onChange={handleChange}
                            placeholder="Password*"
                          />
                        </b>{" "}
                      </div>
                      <div className="textlink w100 fl">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            value="1"
                          />
                          <label htmlFor="remember">Remember Me</label>
                        </div>
                        &nbsp; | &nbsp;{" "}
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        className="red"
                        id="lmsg"
                      ></div>
                      <div className="w100 fl d-flex">
                        <b className="pb5 fl ar">
                          <input
                            type="submit"
                            value="Log in"
                            className="logpop "
                            onClick={handleLogin}
                          />

                          <span className="fa-right">
                            {" "}
                            {/* <FontAwesomeIcon icon={faLongArrowRight} /> */}
                          </span>
                        </b>
                        <b className="pb6 fl ar"  style={{marginLeft:"10px"}}>
                        <input type="button" className="logpop" onClick={handlePasswordModal} value="Forgot password?"/>
                        <span className="fa-right">
                            {" "}
                            {/* <FontAwesomeIcon icon={faLongArrowRight} /> */}
                          </span>
                        </b>
                      </div>
                      <p className="notemsg w100 fl" >
                        If you haven’t created your account yet, please{" "}
                        <a   onClick={signUpModal}>Signup here</a>.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
             <ForgotPassword
            forgotModal={isPasswordModalOpen}
            setForgotModal={setIsPasswordModalOpen}
            />
           
          </DialogContent>
        
          </Dialog>

   
    )
}
export default Login