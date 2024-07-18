const express = require("express")
const router = express.Router();
const authService = require("../services/authServices");
const verifyToken = require("../utils/verifyToken");
const { loginValidation, signUpValidation, forgotPasswordValidation, otpSendValidation, otpVerifyValidation } = require("../validation/app/auth.validation");
const flashService = require("../services/flashMessageService");
const Razorpay = require('razorpay');

router.post('/signup', authService.signUp)

router.post('/login',authService.loginService)
router.post('/get-otp',otpSendValidation, authService.getOtpForMobileAndEmail)
router.post("/verifyOtp",otpVerifyValidation, authService.verifyOtp)


router.get('/profile',verifyToken, authService.getProfile)

router.get('/get-flash-message', flashService.getInArray)



router.post("/change-forgot-password",forgotPasswordValidation,authService.forgotPassword)


module.exports = router 