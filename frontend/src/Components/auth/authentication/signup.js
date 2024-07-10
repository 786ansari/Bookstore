import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { userSignUp } from "../../../services/auth.service";
import { HotToaster } from "../../../utils/Toaster";
import { State}  from 'country-state-city';
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup  = (props) => {
    const [isOpenSingup, setIsOpenSingup] = useState(false);
    const [signUpInfo,setSignUpInfo] = useState({
      name:"",
      // lastName:"",
      mobileNumber:"",
      emailId:"",
      password:"",
      Cpassword:"",
      state:""
    })
    const {
      isLoggedIn,
      userProfile,
      setIsLoggedIn,
      setUserProfile } = useContext(AuthContext)
      const navigate = useNavigate()
    useEffect(()=>{
        setIsOpenSingup(props.isOpenSingup)
    },[props])
    
      const handleCloseDialogSingup = () => {
        props.modalClose("signup",false)
        setIsOpenSingup(false);
      };
      const handleChange = (e) => {
            let {name,value} = e.target
            setSignUpInfo(prevState=>({
              ...prevState,
              [name]:value
            }))
      }
      const EmpytState = () => {
        setSignUpInfo({})
      }

      const handleSignup = async(e) => {
        e.preventDefault()
        const result = await userSignUp(signUpInfo)
        HotToaster(result?.status,result?.message)
        console.log("resultresultresult",result)
        if(result?.status){
            setIsLoggedIn(true)
            setUserProfile(result.data.profile)
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("emailId",result.data.emailId || result.data.mobileNumber)
            localStorage.setItem("name",result.data.name)
            setIsOpenSingup(false);
            props.modalClose("signup",false)
            EmpytState()
            navigate("/");
        }
      }
      const signUpModal = () => {
        props.modalClose("login",true)
        props.modalClose("signup",false)
      }
    return (
        <Dialog open={isOpenSingup} onClose={handleCloseDialogSingup}>
        {/* <DialogTitle>Dialog Title</DialogTitle> */}
        <DialogActions>
          <Button onClick={handleCloseDialogSingup}>Close</Button>
        </DialogActions>
        <DialogContent>
            <div id="fancybox-wrap" className="loginpop fl borR log-img">
              <div className="left form-style rs bgw">
                <div className="ab-image" >
                  <div className="ab-image-inner"></div>
                </div>
                <div className="w100 fl">
                  <form  >
                    <div>
                      <div className="log-top">
                        <div className="log-top-inner">
                          <h3>Welcome! Signup here.</h3>
                          <p>To signup, please enter your details below.</p>
                        </div>
                      </div>
                      <div className="w100 fl">
                        <div className="w100 fl signup-name log-in d-flex">
                          <b className="pb5 fl mr10 w50">
                            <input
                              type="text"
                              title="fname"
                              required
                              className="w100"
                              id="fname"
                              name="name"
                              value={signUpInfo?.name}
                              onChange={handleChange}
                              placeholder="Coaching/Teacher Name"
                            />
                          </b>
                          {/* <b className="pb5 fl mr10 w50">
                            <input
                              type="text"
                              title="lname"
                              required
                              className="w100"
                              id="lname"
                              name="lastName"
                              value={signUpInfo?.lastName}
                              onChange={handleChange}
                              placeholder="Coaching/Teacher Last Name"
                            />
                          </b> */}
                        </div>
                      </div>
                      <div className="w100 fl">
                        <span className="pb5 fl log-in w100 ">
                          <b className="pb5 fl w100">
                            <input
                              type="email"
                              title="Email Address"
                              required
                              className="w100"
                              id="lemail"
                              name="emailId"
                              placeholder="E-mail"
                              value={signUpInfo?.signId}
                              onChange={handleChange}
                            />
                          </b>
                        </span>
                      </div>
                      <div className="w100 fl">
                        <div className="w33 fl signup-pass log-in">
                          <b className="pb5 fl mr10 w100">
                            <input
                              type="password"
                              title="Password"
                              required
                              className="w100"
                              id="pass"
                              name="password"
                              placeholder="Password"
                              value={signUpInfo?.password}
                              onChange={handleChange}
                            />
                           <i class="fas fa-eye-slash"></i>
                          </b>
                        </div>
                        <div className="w33 fl signup-cpass log-in">
                          <b className="pb5 fl w100 ">
                            <input
                              type="password"
                              title="Confirm Password"
                              required
                              className="w100"
                              id="cpass"
                              name="Cpassword"
                              placeholder="Confirm Password"
                              value={signUpInfo?.Cpassword}
                              onChange={handleChange}
                            />
                          </b>
                        </div>
                      </div>
                      <div className="w100 fl">
                        <div className="w33 fl signup-mob">
                          <b className="pb5 fl w100 ">
                          <input
                              type="tel"
                              title="Mobile No."
                              required
                              className="w100"
                              id="mon"
                              name="mobileNumber"
                              placeholder="Mobile No."                             
                              value={signUpInfo?.mobileNumber}
                              onChange={handleChange}
                            />
                          </b>
                        </div>
                        <div className="w33 fl signup-mob">
                          <b className="pb5 fl w100 ">
                            <select name="state" id="txtrstate" value={signUpInfo?.state}
                            onChange={handleChange}
                            >
                              <option value=""> --- Select State --- </option>
                              {State?.getStatesOfCountry("IN")?.map((state,index)=>{
                                return <option value={state.name}>{state.name}</option>
                              })}
                              {/* Add other state options */}
                            </select>
                          </b>
                        </div>
                      </div>
                      <div className="textlink w100 fl">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            value="1"
                          />
                          <label htmlFor="remember">I agree with </label>
                        </div>
                        &nbsp; | &nbsp;{" "}
                        <a href="pop-forgot-password.html">
                          Terms &amp; Conditions.
                        </a>
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
                            value="Register Now"
                            className="logpop " 
                            onClick={handleSignup}
                          />
                          <span className="fa-right">
                            {" "}
                            {/* <FontAwesomeIcon icon={faLongArrowRight} /> */}
                          </span>
                        </b>
                      </div>
                      <p className="notemsg w100 fl">
                        If you already have an account, please{" "}
                        <span  onClick={signUpModal}>
                         <u><a >LOGIN HERE</a></u>
                        </span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </DialogContent>
        
      </Dialog>
    )
}
export default Signup