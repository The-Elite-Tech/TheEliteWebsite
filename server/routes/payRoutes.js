const express = require("express");
const router = express.Router();
const {checkout, paymentVerification, getkey} = require('../controllers/payController');

//post
router.route("/checkout").post(checkout)
router.route("/paymentVerification").post(paymentVerification)

//get
router.route("/getkey").get(getkey)

module.exports = router;