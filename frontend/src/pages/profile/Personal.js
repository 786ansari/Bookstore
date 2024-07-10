import React, { useState, useEffect } from "react"; 
import { setProfileData } from "../../services/profile.service"
import { HotToaster } from "../../utils/Toaster";

const Personal = ({profile,profileApiRecall}) => {
     const [personalInfo,setPersonalInfo] = useState({
          name:profile?profile.name:"",
          // lastName:profile?profile.lastName:"",
          gender:profile?profile.gender:"",
          profileIcon:profile?profile.profileIcon:"",
          mobileNumber:profile?profile.mobileNumber:"",
          dob:profile?profile.dob:"",
          address1:profile?profile.address1:"",
          address2:profile?profile.address2:"",
          city:profile?profile.city:"",
          state:profile?profile.state:"",
          country:profile?profile.country:"",
          pincode:profile?profile.pincode:""
     })

     useEffect(()=>{
               setPersonalInfo(profile)
     },[profile])

     const handleChange = (e) => {
          const { name, value } = e.target;
          setPersonalInfo(prevState=>({
               ...prevState,
               [name]:value
          }))
     }
     const handleImageChange = (e) => {
          const { files } = e.target
          setPersonalInfo(prevState=>({
               ...prevState,
               "profileIcon":files[0]
          }))
     }

     const handleClick = async(e) => {
          e.preventDefault()
          console.log("ahndpehnandke=",personalInfo)
          let formData = new FormData()
          formData.append("name",personalInfo.name)
          // formData.append("lastName",personalInfo.lastName)
          formData.append("gender",personalInfo.gender)
          formData.append("profileIcon",personalInfo.profileIcon)
          // formData.append("mobileNumber",personalInfo.mobile)
          formData.append("dob",personalInfo.dob)
          formData.append("address1",personalInfo.address1)
          formData.append("address2",personalInfo.address2)
          formData.append("city",personalInfo.city)
          formData.append("state",personalInfo.state)
          formData.append("country",personalInfo.country)
          formData.append("pincode",personalInfo.pincode)
          let result = await setProfileData(formData)
          HotToaster(result?.status,result?.message)
          profileApiRecall()
     }
  
 
  return (
     
     <div className="profile-main-clint">
       <div className="profile-inner">
          <div className="profile-form">
                <h3>Edit Profile Here</h3>
                <div className="form-pro">
                   <form>
                      <div className="row">
                          <div className="col-lg-6">
                               <label className="label-width">Coachcing/Teacher Name</label>
                               <input type="text" name="name" value={personalInfo?.name} className="inhight" onChange={handleChange} ></input>
                          </div>
                          <div className="col-lg-6">
                               <label className="label-width">DOB</label>
                               <input type="date" name="dob" onChange={handleChange} value={personalInfo?.dob} className="inhight"></input>
                          </div>
                          {/* <div className="col-lg-6">
                               <label className="label-width" >Last Name</label>
                               <input type="text" name="lastName" value={personalInfo?.lastName} className="inhight" onChange={handleChange}></input>
                          </div> */}
                      </div>
                       
                      <div className="row">
                          <div className="col-lg-6 lab-gen">
                               <label className="label-width"  >Gender</label>
                               <input type="radio" name="gender" checked={personalInfo?.gender == "Male"} onChange={handleChange} value="Male"/>
                               <label>Male</label>
                               <input type="radio" name="gender" onChange={handleChange} checked={personalInfo?.gender == "Female"} value="Female"/>
                               <label>Female</label>
                               <input type="radio" name="gender" onChange={handleChange} checked={personalInfo?.gender == "Other"} value="Other"/>
                               <label>Other</label>
                          </div>
                          <div className="col-lg-6">
                               <label className="label-width">Profile Image</label>
                               <input type="file" name="profileIcon" onChange={handleImageChange} ></input>
                          </div>
                      </div>
{/* 
                      <div className="row">
                          <div className="col-lg-6">
                               <label className="label-width" >Mobile No.</label>
                               <input type="tel" name="mobileNumber" onChange={handleChange} value={personalInfo?.mobileNumber} className="inhight" />
                          </div>
                         
                      </div> */}

                      <div className="row">
                          <div className="col-lg-6">
                               <label className="label-width" >Address 1</label>
                               <input type="text" name="address1" onChange={handleChange} value={personalInfo?.address1} className="inhight"/>
                          </div>
                          <div className="col-lg-6">
                               <label className="label-width">Address 2</label>
                               <input type="text" name="address2" onChange={handleChange} value={personalInfo?.address2} className="inhight"></input>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-lg-6">
                               <label className="label-width" >City</label>
                               <input type="text" name="city" onChange={handleChange} value={personalInfo?.city} className="inhight"/>
                          </div>
                          <div className="col-lg-6">
                               <label className="label-width">State</label>
                               <input type="text" name="state" onChange={handleChange} value={personalInfo?.state} className="inhight"></input>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-lg-6">
                               <label className="label-width" >Country</label>
                               <input type="text" name="country" onChange={handleChange} value={personalInfo?.country} className="inhight"/>
                          </div>
                          <div className="col-lg-6">
                               <label className="label-width">Pincode</label>
                               <input type="text" name="pincode" onChange={handleChange} value={personalInfo?.pincode} className="inhight"></input>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-lg-12 sub">
                              <input type="submit" value="submit" name="submit" onClick={handleClick}/>
                          </div>
                      </div>

                      </form>
                </div>
          </div>
       </div>
     </div>
    
  );
};

export default Personal;
