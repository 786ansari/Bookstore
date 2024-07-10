import React, { useContext, useEffect, useState } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import Textra from "react-textra";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminInfoContext";
import Authentication from "../../Components/auth";
import { FlashMessageGet } from "../../services/book.service";
export default function SlideShow(props) {
  const [profileContainer, setProfileContainer] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSingup, setIsOpenSingup] = useState(false);
  const [flashMessages, setFlashMessages] = useState([]);
  const { isLoggedIn,userProfile,setIsLoggedIn } = useContext(AuthContext)
  const { adminInfo  } = useContext(AdminContext)
  
  const navigate = useNavigate();
  useEffect(()=>{
    getAllFlashMessages()
  },[])

  const handleOpenDialogLogin = () => {
    setIsOpenLogin(true);
  };
  const modalClose = (page, boolean) => {
    if (page == "login") {
      setIsOpenLogin(boolean);
    } else {
      setIsOpenSingup(boolean);
    }
  };

  const getAllFlashMessages = async() => {
    let result = await FlashMessageGet()
    if(result?.status){
      setFlashMessages(result.data)
    }

  }

  const handleOpenDialogSingup = () => {
    setIsOpenSingup(true);
  };
  return (
    <div className="top-header">
      {console.log("flashMessagesflashMessages",flashMessages)}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <div className="text">
              <Textra effect="leftRight" data={flashMessages} />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="social-top">
              <ul>
                <li>
                  <div className="soc-border">
                    <div className="soc-i">
                      {" "}
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="soc-e">
                      {" "}
                      <a href={`mailto:${adminInfo?.emailId}`}>{adminInfo?.emailId}</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="soc-border">
                    <div className="soc-i">
                      {" "}
                      <i class="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="soc-e">
                      {" "}
                      <a href={`tel:${adminInfo?.mobileNumber}`}>{adminInfo?.mobileNumber}</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="logtop mid-log">
              <div className="fr lo-pt">
                <ul style={{ color: "#FFFFFF" }}>
                  {!isLoggedIn? (
                    <>
                      {" "}
                      <li
                        onClick={handleOpenDialogLogin}
                        className="print-btn pup-login"
                      >
                        <div className="soc-border">
                    <div className="soc-i">
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                    </div>
                    <div className="soc-e">
                    <p style={{ color: "#fff" }}>Login</p>
                    </div>
                  </div>
                      </li>
                      <li
                        onClick={handleOpenDialogSingup}
                        className="print-btn pup-login"
                      >
                        <div className="soc-border">
                    <div className="soc-i">
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                    </div>
                    <div className="soc-e">
                    <p style={{ color: "#fff" }}>Sign Up</p>
                    </div>
                  </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="print-btn pup-login"
                        onClick={() => {
                          setProfileContainer(!profileContainer);
                        }}
                      >
                        <i
                          style={{ color: "#fff" }}
                          className="fa fa-user fa-social"
                        ></i>
                        <p style={{ color: "#fff", marginLeft: "10px" }}>
                          {userProfile?.name || userProfile?.emailId}
                        </p>
                      </li>
                    </>
                  )}
                  {/* <li><a href="cart.html"><img src="images/img_11.png"> CHECKOUT</a></li> */}
                </ul> 
                <Authentication
                    isOpenLogin={isOpenLogin}
                    isOpenSingup={isOpenSingup}
                    setIsOpenLogin={setIsOpenLogin}
                    setIsOpenSingup={setIsOpenSingup}
                    modalClose={modalClose}
                    />
                {profileContainer && (
                  <div className="user-profile">
                    <div className="user-pro-main">
                      <h6>Your Account Profile</h6>
                      <ul>
                        <li>
                          <Link to="/profile">Your Account</Link>
                        </li>
                        <li>
                          <a href="#">Your Order</a>
                        </li>
                        {/* <li>
                          <a href="#">Login Security</a>
                        </li> */}
                        <li
                          onClick={() => {
                            localStorage.removeItem("emailId");
                            localStorage.removeItem("token");
                            setIsLoggedIn(false)
                            setProfileContainer(!profileContainer)
                            navigate("/");
                          }}
                        >
                          <a>Sign Out</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

