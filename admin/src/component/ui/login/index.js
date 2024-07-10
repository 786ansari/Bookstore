import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLogin } from "../../../services/user.service";
import { HotToaster } from "../../../utils/Toaster";
import { ProfileContext } from "../contextProvider";
// import AuthService from "../../../api/services/AuthService";
// import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
// import { ProfileContext } from "../../../context/ProfileProvider";
// import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const LoginPage = () => {
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
    const handleLogin = async() => {
        let data = {
            emailId:email,
            password:password
        }
        let result
            try{
                result = await AdminLogin(data)
                console.log("errorororo",result)
                HotToaster(result?.status,result.message)
        if(result.status){
                localStorage.setItem("token",result.data.token)
                updateProfileState(result.data);
                    navigate('/dashboard');
                console.log("resultresult======>>>>",result)
            }
            }
            catch(err){
                console.log("err",err,result)
                HotToaster(false,err)
    
            }

       
        
       

       


    }

    // const handleLogin = async (email, password) => {
    //     LoaderHelper.loaderStatus(true);
    //     await AuthService.login(email, password).then(async result => {
    //         console.log("userTypeuserTypeuserType",result.data)
    //         if (result?.status) {
    //             LoaderHelper.loaderStatus(false);
    //             try {
    //                 localStorage.setItem("token", result.data.token);
    //                 localStorage.setItem("emailId", result.data.emailId);
    //                 localStorage.setItem("userType", result.data.userType);
    //                 localStorage.setItem("userId", result.data.userId);
    //                 localStorage.setItem("permissions", JSON.stringify(result?.data?.permissions || []));
    //                 updateProfileState(result.data);
    //                 alertSuccessMessage(result.message);
    //                 navigate('/dashboard');
    //             } catch (error) {
                    
    //                 alertErrorMessage(error);
    //             }
    //         } else {
    //             LoaderHelper.loaderStatus(false);
    //             alertErrorMessage(result.message);
    //         }
    //     });
    // }

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
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="passwordExample">Password</label>
                                                <input className="form-control form-control-solid" type="password" placeholder="" aria-label="Password" name="password" aria-describedby="passwordExample" value={password} onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                <Link className="btn-link text-decoration-none" to="/forgot-password">Forgot your password</Link>
                                            </div>
                                            <div className="text-center py-3 mt-2">
                                                <button type="button" className="btn btn-block w-100 btn-xl btn-primary btn_admin mt-2 px-5"
                                                    onClick={() => handleLogin(email, password)}>
                                                    Login
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
        </div>
    );
}

export default LoginPage;