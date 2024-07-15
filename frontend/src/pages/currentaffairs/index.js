import React, { useState, useEffect } from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
import MyOrder from "../profile/MyOrder";
import { BookDetailsById } from "../../services/book.service";
import DailyCurrent from "./DailyCurrent";
import HalfYearlyCurrent from "./HalfYearlyCurrent";
import Monthly from "./MonthlyCurrent";
import MonthlyCurrent from "./MonthlyCurrent";
import WeeklyCurrent from "./WeeklyCurrent";
import YearlyCurrent from "./YearlyCurrent";
import SubScription from "./SubScription"; 
import DatePickerComponet from "../../customComponent/DatePickerComponet";
import Button from "../../customComponent/Button";
import { checkSubsciption, getCurrentAffairs } from "../../services/currrentaffairs.service";
import SlideShow from "../../Components/Slideshow/Slideshow";
import SocialIcons from "../../Components/socialmedia";
import FeedbackForm from "../../Components/support"
import NewsletterSubscription from "../../Components/UserFeedback";
import CartList from "../../Components/AddCart/CartList";
import { imageUrl } from "../../services/dataurl";
import { useNavigate } from "react-router-dom";


const CurrentAffairs = () => {
    const [tabSelected, setTabSelected] = useState("Daily");
    const [startDate, setStartDate] = useState(new Date());
    const [cartVisiable, setCartVisiable] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [type, setType] = useState("");
    const [customerCare, setCustomerCare] = useState(false);
    const [newsLater, setNewsLater] = useState(false);
    const [fileType, setFileType] = useState("");
    const [currentAffairsList,setCurrerntAffairsList] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
      getCurrentAffairsData()
    },[tabSelected])
    const getCurrentAffairsData = async() => {
      let data = {
        type:tabSelected
      }
      const result = await getCurrentAffairs(data)
      setCurrerntAffairsList(result.data)
    }

    const handleClick = async() => {
        let data = {
            fromDate:startDate,
            toDate:endDate,
            type:tabSelected,
            fileType:fileType
        }
        const result = await getCurrentAffairs(data)
      setCurrerntAffairsList(result.data)
    }

    const cartVisibility = (e) => {
      setCartVisiable(!cartVisiable)
    }
    const handleFileChange = async(val) => {
      const data = {
        _id:val?._id,
        type:val?.type,
        fileType:val?.fileType,
        plan:val?.plan
      }
      const result = await checkSubsciption(data)
      console.log("hdnlefilechange",result,val)

      if(!result.status){
          navigate("/subscription-plan",{state:"current_affairs"})
      }
      else{
        window.open(imageUrl+result.data.file)
      }
    }
    

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className={"col-12"}>
                <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]}  />
                    <Header cartVisibility={cartVisibility} />
                
                    <div className="current-aff-main">
                        <div className="current-title">
                            <h4>Current Affairs</h4>
                        </div>
                        <div className="current-broadcum">
                            <a href="#">Home<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span></a>
                            <a href="#">Current Affairs</a>
                        </div>
                        <div className="current-mm">
                        <div className="row current-inner">                        
                            <div className="col-lg-2 current-left">
                            <div className="current-name">Current Affairs</div>
                                <div className="current-link">
                                    <div className="current-link-inner">
                                        <ul>
                                            <li><a className={tabSelected == "Daily" ? "active" : ""} href="#" onClick={() => setTabSelected("Daily")}>Daily </a></li>
                                            <li><a className={tabSelected == "Weekly" ? "active" : ""} href="#" onClick={() => setTabSelected("Weekly")}>Weekly </a></li>
                                            <li><a className={tabSelected == "Monthly" ? "active" : ""} href="#" onClick={() => setTabSelected("Monthly")}>Monthly </a></li>
                                            <li><a className={tabSelected == "Half Yearly" ? "active" : ""} href="#" onClick={() => setTabSelected("Half Yearly")}>Half Yearly </a></li>
                                            <li><a className={tabSelected == "Yearly" ? "active" : ""} href="#" onClick={() => setTabSelected("Yearly")}>Yearly </a></li>
                                            <li><a className={tabSelected == "Subscription" ? "active" : ""} href="#" onClick={() => setTabSelected("Subscription")}>Subscription Plan </a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 current-right">
                                <div className="current-filter">
                                    <div className="special-con">
                                        <div className="special-sub">
                                            <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                                            </p>
                                        </div>
                                    </div>
                                     <div className="row">
                                          <div className="col-lg-3">
                                              <div className="date-filt">
                                             <label>From Date</label>
                                              <DatePickerComponet 
                                              selected={startDate}
                                               onChange={(date) => setStartDate(date)} 
                                               
                                               />
                                              </div> 
                                          </div>
                                          <div className="col-lg-3">
                                              <div className="date-filt">
                                              <label>Till Date</label>
                                              <DatePickerComponet selected={endDate} onChange={(date) => setEndDate(date)} />
                                              </div> 
                                          </div>
                                         
                                          <div className="col-lg-3">
                                              <div className="date-filt">
                                              <label>Select Your Option</label>
                                                 <select
                                                 onChange={(e)=>setFileType(e.target.value)}
                                                 >
                                                      <option value="">Select One</option>
                                                      <option value="pdf">PDF</option>
                                                      <option value="ppt">PPT</option>
                                                      <option value="pptPdf">PDF + PPT</option>
                                                      <option value="editable">EDITABLE FILE </option>
                                                 </select>
                                              </div> 
                                          </div>
                                          <div className="col-lg-3">
                                              <div className="date-filt">
                                              <Button label="Search" onClick={handleClick}/>
                                              </div> 
                                          </div>
                                     </div>
                                </div>
                                <SocialIcons/>
                                <div className="current-main">
                                    <div className="current-right">
                                     {tabSelected == "Daily" && <DailyCurrent data={currentAffairsList} getFile = {handleFileChange}/>}  
                                     {tabSelected == "Half Yearly" && <HalfYearlyCurrent data={currentAffairsList} getFile = {handleFileChange}/>} 
                                     {tabSelected == "Monthly" && <MonthlyCurrent data={currentAffairsList} getFile = {handleFileChange}/>}
                                     {tabSelected == "Weekly" && <WeeklyCurrent data={currentAffairsList} getFile = {handleFileChange}/>}
                                     {tabSelected == "Yearly" && <YearlyCurrent data={currentAffairsList} getFile = {handleFileChange}/>}   
                                     {/* {tabSelected == "Subscription" && <SubScription data={currentAffairsList}/ >}        */}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {cartVisiable ? (
                <div className="col-2 cart-right">
                  <CartList/>
                </div>
              )
                : <></>
              }
                    </div>
                    <Footer />
                    <p className="mt10 carebutt download-C1">
                  <a
                    onClick={() => {
                      setNewsLater(!newsLater);
                      setCustomerCare(false);
                    }}
                    className="pup-login"
                  >
                    <img src="images/newsletter.jpg" />
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
                    <img src="images/support.jpg" />
                  </a>
                  {newsLater && <NewsletterSubscription />}
                  {customerCare && <FeedbackForm isOpenFeedback={customerCare} />}
                </p>
                
                </div>
            </div>
        </div>
    )
}

export default CurrentAffairs;