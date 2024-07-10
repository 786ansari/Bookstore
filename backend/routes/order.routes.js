const express = require("express")
const router = express.Router();
const orderService = require("../services/orderService")
const verifyToken = require("../utils/verifyToken");

router.post("/create-order",verifyToken, orderService.createOrder)

router.get("/get-subscription-plans",verifyToken,orderService.getSubsPlan)

router.post("/payment-capture",verifyToken,orderService.capturePayment)

module.exports = router