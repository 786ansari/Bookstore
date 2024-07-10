const express = require("express")
const router = express.Router();
const TestSeriesService = require("../services/testseriesService");
const verifyToken = require("../utils/verifyToken");


router.post("/getTestSeries",TestSeriesService.getTestSeries)
router.post("/check-user-subscription",verifyToken,TestSeriesService.check_is_user_subscribed)

module.exports = router