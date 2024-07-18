const userModel = require("../models/usermodels");
const authModal = require("../models/authmodels");
const validators = require("../utils/validator");
const AppErr = require("../utils/error")
const bcrypt = require("../utils/bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { getcartinfo } = require("../models/bookmodels");
const R = require("../utils/responseHelper");
const currentAffairsSchema = require("../models/currentaffairs")
const validateInput = require("../helper/emailmobileVal")
const sendOtpEmail = require("../utils/Sendgrid")
const IP = require('ip');


const auth = {};

auth.addUsers = async(req,res,next) => {
    try {
        let userAddition = await authModel.addUser()
        return R(res,true,"Data submitted successfully!!",{},200)
    } catch (error) {
        next(error)
    }
  
}
auth.getUsers = async(req,res,next) => {
    try {
    const get = await authModal.getUser()
    return R(res,true,"Data submitted successfully!!",get,200)
    } catch (error) {
        next(error)
    }
}
auth.changeActiveStatus = async(req,res,next)=>{
    try {
        let add = await authModal.changeStatus(req.body)
        return R(res,true,"Status updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
 
}

auth.changeUserDeleteStatus = async(req,res,next)=>{
    try {
        let add = await authModal.changeDeleteStatus(req.body)
        return R(res,true,"Status updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
 
}


auth.getProfile = async(req,res,next) => {
    try {
        console.log("useriseruseruser",req.doc)
        let get = await authModel.showprofile(req.doc.userId)
        return R(res, true, "Profile found successfully", get,200)
    } catch (error) {
        next(error)
    }
}
auth.verifyOtp = async(req,res,next) => {
    try {
        const {otpkey,otp} = req.body
    const check = validateInput(otpkey)
        console.log("getusergetuser",check,otpkey)
    let getUser = await authModel.login(check, otpkey);
    if(getUser.otp == otp){
        getUser.otp = "";
        await getUser.save()
        return R(res, true, `OTP matched successfully!`, {},200)
    }
    else{
        return R(res, false, `OTP doesn't matched!`, {},200)
    }
    } catch (error) {
        next(error)
    }
    
}

auth.getOtpForMobileAndEmail = async(req,res,next) => {
    try{
        const {otpkey} = req.body
        const check = validateInput(otpkey)
      if(check == "invalid"){
        return R(res, false, `Invalid input!`, {},200)
      }
        let getUser = await authModel.login(check, otpkey);
      console.log("getusergetuser",Object.values(getUser).length)
        
        if(Object.values(getUser).length>0){
            const generateOtp = () => {
                return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
              };
              
            if( check == "emailId"){                  
                  const otp = generateOtp();
                  getUser.otp = otp;
                  getUser.save()
                  const sendmail = await sendOtpEmail(otpkey, otp,res);
                  if(sendmail){
                    return R(res, true, `OTP sent successfully! Please check your mail`,{} ,200)
                  }
                  else{
                  return R(res, false, `Error while sending otp`,{} ,501)
                  }
            }
            else{
                const otp = generateOtp();
                getUser.otp = otp;
                getUser.save()
                return R(res, true, `OTP sent successfully! ${otp}`,otp ,200)
            }
            
        }
        return R(res, false, "User not found", {},200)
    }catch(error){
        next(error)
    }
   

}


auth.loginService = async (req,res,next) => {
    try {
        let {
            name,emailId, password,sign_mode
        } = req.body
        const ipAddress = IP.address();
        console.log(ipAddress)
        let val = await authModel.login("emailId", emailId);
        if(Object.values(val).length>0 && !val?.is_active){
            return R(res, false, "User not active! contact to admin!! ", {},200)
        }
        if(Object.values(val).length>0 && val?.is_deleted){
            return R(res, false, "User Deleted!", {},200)
        }
        if(sign_mode == "MANUAL"){
            if(val){
            const compare = await bcrypt.passwordComparision(
                password,
                val.password
            );
            if (compare) {
                const userData = {
                    // userId: val["userId"],
                    userId: val._id,
                    emailId: val.emailId,
                    name: val.name,
                    mobileNumber: val.mobileNumber,
                };
                let getCartByIp = await BookModel.getbookfromcart(ipAddress)
                console.log("userdatauserdata",getCartByIp,ipAddress);
                if(getCartByIp.length>0){
                    let updateCartUserId = await BookModel.updateUserId(ipAddress,userData.userId)
                }
    
                const jwtdata = {
                    expiresIn: process.env.JWT_TIMEOUT_DURATION,
                };
                const secret = process.env.JWT_SECRET;
                userData.token = jwt.sign(userData, secret);
                userData.profile = val
                return R(res, true, "Login Successfully", userData,200)
            } else {
               return R(res, false, "Password not matched", {},403)
            }
        }}
        if(sign_mode == "GOOGLE"){
            if(Object.values(val).length>0){
                const userData = {
                    userId: val._id,
                    emailId: val.emailId,
                    name: val.name,
                };
                let getCartByIp = await BookModel.getbookfromcart(ipAddress)
                if(getCartByIp.length>0){
                    let updateCartUserId = await BookModel.updateUserId(ipAddress,val._id)
                }
    
                const secret = process.env.JWT_SECRET;
                userData.token = jwt.sign(userData, secret);
                userData.profile = val
                return R(res, true, "Login Successfully", userData,200)
            
        }else{
            console.log("oneoneoneoneone",req.body)
            const now = new Date();
            const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            const futureTimeInMillis = futureDate.getTime()
            const newUser = {
                emailId: emailId,
                name: name,
                subscription_end_for_current_affairs:futureTimeInMillis
            }
            console.log("twotwotwotwotwo",newUser)
            const register = await authModel.signUp(newUser)
            const userData = {
                emailId: emailId,
                name: name,
                userId:register._id
            };
            console.log("twotwotwotwotwo",userData,register)
            const secret = process.env.JWT_SECRET;
            userData.token = jwt.sign(userData, secret);
            userData.profile = req.body
            console.log("twotwotwotwotwo",secret,userData)
            return R(res, true, "Account logged in Successfully!!", userData,200)
        }
    }
        else {
            return R(res, false, "No user found", {},403)
         }
        
    } catch (error) {
        next(error)
    }
    
};

auth.signUp = async (req,res,next) => {
    const { Cpassword,emailId,mobileNumber,name,password,state,sign_mode } = req.body
    const now = new Date();
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const futureTimeInMillis = futureDate.getTime()
    const ipAddress = IP.address();
    try{
        if(sign_mode == "MANUAL"){
            let isUserExist = await authModel.checkAvailablity(emailId,mobileNumber)
            if (isUserExist?.length>0) {
                return R(res, false, "Email Id or Mobile Number already exists!!", {},406)
            }
            const newUser = {
                emailId: emailId,
                name: name,
                // lastName:lastName,
                mobileNumber: mobileNumber,
                password: await bcrypt.passwordEncryption(password),
                state: state,
                subscription_end_for_current_affairs:futureTimeInMillis
            }
            const register = await authModel.signUp(newUser)
            const userData = {
                emailId: emailId,
                name: name,
                mobileNumber: mobileNumber,
                userId:register._id
            };
            let getCartByIp = await BookModel.getbookfromcart(ipAddress)
            if(getCartByIp.length>0){
                let updateCartUserId = await BookModel.updateUserId(ipAddress,register._id)
            }
            console.log("registerregisterregister",register)
            const secret = process.env.JWT_SECRET;
            userData.token = jwt.sign(userData, secret);
            userData.profile = req.body
            return R(res, true, "Account Registered Successfully!!", userData,200)
        }
        else if(sign_mode == "GOOGLE"){
            let isUserExist = await authModel.login("emailId",emailId)
            if (Object.values(isUserExist).length>0) {
                const userData = {
                    emailId: emailId,
                    name: name,
                    userId:isUserExist._id
                };
                const secret = process.env.JWT_SECRET;
                userData.token = jwt.sign(userData, secret);
                userData.profile = req.body
                return R(res, true, "Account logged in successfully!!", userData,200)
            }
            const newUser = {
                emailId: emailId,
                name: name,
                // lastName:lastName,
                subscription_end_for_current_affairs:futureTimeInMillis
            }
            const register = await authModel.signUp(newUser)
            let getCartByIp = await BookModel.getbookfromcart(ipAddress)
            if(getCartByIp.length>0){
                let updateCartUserId = await BookModel.updateUserId(ipAddress,register._id)
            }
            const userData = {
                emailId: emailId,
                name: name,
                userId:register._id
            };
            console.log("registerregisterregister",register)
            const secret = process.env.JWT_SECRET;
            userData.token = jwt.sign(userData, secret);
            userData.profile = req.body
            return R(res, true, "Account Registered Successfully!!", userData,200)
            
        }
   

}catch(err){
    next(err)
}
};

auth.addsubadmin = async (req,res,next) => {
    try {
        req.body.password = await bcrypt.passwordEncryption(req.body.password);
        let findSubadmin = await authModel.findsubadmin(req.body.email)
        if (findSubadmin) {
            return R(res,false,"Email Id Already Exists Please choose different email Id!!!",{},200)
        }
        let ins = await authModel.subadmin(req.body);
        return R(res,true,"Data submitted successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
};
auth.getsubadmins = async(req,res,next) => {
    try{
        let get = await authModel.findsubadminlist(req.body.type)
        return R(res,true,"Data found successfully!!",get,200)
    }catch(error){
        next(error)
    }
}
auth.setsudadmin = async (req,res,next) => {
        req.body.password =  await bcrypt.passwordEncryption(req.body.password);
    try {
        let usersatuts = await authModel.setsubadmin(req.body);
        return R(res,true,"Data updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
   
}
auth.subadminstatus = async (req,res,next) => {
    const {id,status} = req.body
    try {
        let usersatuts = await authModel.userstatus(id, status);
        return R(res,true,"Status updated successfully!!",{},200)
    } catch (error) {
        next(error)
    }
};
auth.deletesubuser = async (req,res,next) => {
    const {id} = req.body
    try {
        let usersatuts = await authModel.userdelete(id);
        return R(res,true,"Data removed successfully!!",{},200)
    } catch (error) {
        next(error)
    }
};

auth.forgotPassword = async (req,res,next) => {
    try{
        const {password,cpassword,otpkey} = req.body
        const check = validateInput(otpkey)
      console.log("getusergetuser",check,otpkey)
      if(check == "invalid"){
        return R(res, false, `Invalid input!`, {},200)
      }
        let getUser = await authModel.login(check, otpkey);
        if(Object.values(getUser).length>0){
            const newpassword = await bcrypt.passwordEncryption(password);
            getUser.password = newpassword;
            await getUser.save()
            return R(res,true,`Password changed successfully`,{},200)
        }
        return R(res,true,`User not found!! Please try again`,{},200)

           
    }catch(error){
        next(error)
    }
};





module.exports = auth;



