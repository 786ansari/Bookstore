import React, { useState, useEffect, useContext } from "react"; 

import { Toaster } from "react-hot-toast"
import Footer from "../../comman/Footer"
import Header from "../../comman/Header" 
import SlideShow from "../../Components/Slideshow/Slideshow"
import Authentication from "../../Components/auth"
import CartList from "../../Components/AddCart/CartList"

import MyOrder from "./MyOrder";
import ChangePassword from "./ChangePassword";
import UpdateMobileEmail from "./UpdateMobileEmail";
import PersonalDetails from "./Personal";
import Support from "./Support";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Personal from "./Personal";
import { AuthContext } from "../../context/AuthContext";
import { imageUrl } from "../../services/dataurl";
import NewsletterSubscription from "../../Components/UserFeedback";
import FeedbackForm from "../../Components/support";


const Profile = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSingup, setIsOpenSingup] = useState(false);
  const [cartVisiable, setCartVisiable] = useState(false);
  const [tabSelected, setTabSelected] = useState("myprofile");
  const [getTotal,setGetTotal] = useState(0)
  const [customerCare, setCustomerCare] = useState(false);
  const [newsLater, setNewsLater] = useState(false);

  const { userProfile,profile } = useContext(AuthContext)
  const handleOpenDialogLogin = () => {
    setIsOpenLogin(true);
  };

  const handleOpenDialogSingup = () => {
    setIsOpenSingup(true);
  };
  const modalClose = (page, boolean) => {
    if (page == "login") {
      setIsOpenLogin(boolean);
    } else {
      setIsOpenSingup(boolean);
    }
  };
  const cartVisibility = (e) => {
    setCartVisiable(!cartVisiable)
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className={cartVisiable ? "col-10" : "col-12"}>
            <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]} loginPopup={handleOpenDialogLogin} signupPopup={handleOpenDialogSingup} />
            <Header cartVisibility={cartVisibility} />
            <Authentication
              isOpenLogin={isOpenLogin}
              isOpenSingup={isOpenSingup}
              setIsOpenLogin={setIsOpenLogin}
              setIsOpenSingup={setIsOpenSingup}
              modalClose={modalClose}
            />
            <div>
              <h2>Profile page</h2>
            </div>
          </div>
          <div className="col-lg-9 current-right">
           <p className="mt10 carebutt download-C1">
                  <a
                    onClick={() => {
                      setNewsLater(!newsLater);
                      setCustomerCare(false);
                    }}
                    className="pup-login"
                  >
                    <img src="../images/newsletter.jpg" />
                  </a>
                </p>
                <p
                  className="mt100 carebutt download-C"
                  style={{ marginTop: "0px", height: "0px" }}
                >
                  <a
                    onClick={() => {
                      setNewsLater(false);
                      setCustomerCare(!customerCare);
                    }}
                    className="pup-login"
                  >
                    <img src="../images/support.jpg" />
                  </a>
                  {newsLater && <NewsletterSubscription />}
                  <FeedbackForm isOpenFeedback={customerCare} />
                </p>
                </div>

          {cartVisiable && (
            <div className="col-2">
              <CartList getTotalOfCart={getTotal} />
            </div>
          )}
        </div>

        <div className="profilr-outer">
          <div className="row">
            <div className="col-lg-4 profilr-main">
              <div className="profilr-left">
                <div className="profilr-image">
                  <div className="profile-image-inner">
                    {userProfile?.profileIcon ? <img src={imageUrl+userProfile?.profileIcon }/>:<Avatar
							style={{ backgroundColor: '#e12729', verticalAlign: 'middle' }}
							className='cap'
							size={80}
						>
							{' '}
							{userProfile?.name?.charAt(0)}{' '}
						</Avatar>}
                    <h5>{userProfile?.name || "User"}</h5>
                    <h6>{userProfile?.emailId || ""}</h6>
                    <h6>{userProfile?.mobileNumber || ""}</h6>
                    <h6>Active</h6>
                  </div>

                  <div className="profile-link">
                    <div className="profilr-link-inner">
                      <ul>
                        <li><a className={tabSelected == "myprofile" ? "active" : ""} href="#" onClick={() => setTabSelected("myprofile")}>My Profile</a></li>
                        <li><a className={tabSelected == "myorder" ? "active" : ""} href="#" onClick={() => setTabSelected("myorder")}>My Orders</a></li>
                        <li><a className={tabSelected == "changepassword" ? "active" : ""} href="#" onClick={() => setTabSelected("changepassword")}>Change Password</a></li>
                        <li><a className={tabSelected == "updateemail" ? "active" : ""} href="#" onClick={() => setTabSelected("updateemail")}>Update Email / Mobile No.</a></li>
                        {/* <li><a className={tabSelected == "support" ? "active" : ""} href="#" onClick={() => setTabSelected("support")}>Support</a></li> */}
                        {/* <li><a className={tabSelected == "referral" ? "active" : ""} href="#" onClick={() => setTabSelected("referral")}>Referral</a></li> */}
                        {/*<li><a className={tabSelected == "signout" ? "active" : ""} href="#" onClick={() => setTabSelected("signout")}>Sign Out</a></li>
                        <li><a className={tabSelected == "langauge" ? "active" : ""} href="#" onClick={() => setTabSelected("langauge")}>Langauge English</a></li>
                      */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="profile-main">
                <div className="profile-right">
                  {tabSelected == "myprofile" &&  <Personal profile= {userProfile} profileApiRecall = {profile}/> }
                  {tabSelected == "myorder"  &&   <MyOrder/> } 
                   {tabSelected == "changepassword" &&  <ChangePassword/> }
                   {tabSelected == "updateemail" &&  <UpdateMobileEmail/> }
                   {/* {tabSelected == "support" &&  <Support/> } */}
                   {/* {tabSelected == "referral" &&  <div className="referral">dfgsdfgdfg</div>} */}
                 
                 
                  
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Profile