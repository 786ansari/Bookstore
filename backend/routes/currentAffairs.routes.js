const express = require("express")
const router = express.Router();
const CurrentAffairs = require("../services/currentAffairsService");
const verifyToken = require("../utils/verifyToken");

router.post("/getCurrentAffairsFiles",CurrentAffairs.find)
router.post("/check-user-subscription",verifyToken,CurrentAffairs.check_is_user_subscribed)

module.exports = router