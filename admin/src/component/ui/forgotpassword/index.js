import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLogin, forgotPassword } from "../../../services/user.service";
import { HotToaster } from "../../../utils/Toaster";
import { ProfileContext } from "../contextProvider";
import { Toaster } from "react-hot-toast";
// import AuthService from "../../../api/services/AuthService";
// import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
// import { ProfileContext } from "../../../context/ProfileProvider";
// import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [profileState, updateProfileState] = useContext(ProfileContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            default:
        }
    }
    const handleForgotChange = async() => {
        let data = {
            emailId:email
        }
        let result
            try{
                result = await forgotPassword(data)
                console.log("sdjfsdjhfsdhfhsbd",result)
            HotToaster(result.status,result.message)
        if(result.status){
            }
            else{
                HotToaster(false,result.message)
            }
           
            }
            catch(err){
                console.log("err",err,result)
                HotToaster(false,err)
    
            }
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container-xl px-4">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                                <div className="card my-5">
                                    <div className="card-body p-5 text-center">
                                        {/* <img src="/assets/img/st-logo.jpeg" className="img-fluid" alt="" /> */}
                                    </div>
                                    {/* <hr className="my-0" /> */}
                                    <div className="card-body p-5">
                                        <form>
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="emailExample">Email address</label>
                                                <input className="form-control form-control-solid" type="email" name="email" placeholder="" aria-label="Email Address" aria-describedby="emailExample" value={email} onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                <Link className="btn-link text-decoration-none" to="/">Login</Link>
                                            </div>
                                            <div className="text-center py-3 mt-2">
                                                <button type="button" className="btn btn-block w-100 btn-xl btn-primary btn_admin mt-2 px-5"
                                                    onClick={handleForgotChange}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster/>
        </div>
    );
}

export default ForgotPassword;