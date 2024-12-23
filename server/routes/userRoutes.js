const express = require("express");
const router = express.Router();
const {Auth} = require('../middleware/auth')
const {register, login, verifyUser, getUser, updateUser, updatePlan, resetPassword} = require('../controllers/userController');
const { generateOTP, verifyOTP, verifyResetOTP } = require('../controllers/userOTPController');
const {registerMail, otpMail} = require('../controllers/mailer');

// post
router.route("/register").post(register)
router.route("/registerMail").post(registerMail)
router.route("/authenticate").post(verifyUser, (req, res) => res.end())
router.route("/login").post(verifyUser, login)
router.route('/verifyOTP').post(verifyOTP)
router.route('/verifyResetOTP').post(verifyResetOTP)
// router.route('/otpMail').post(otpMail)
router.route('/generateOTP').post(generateOTP, otpMail)
router.route("/forgotpassword").post(verifyUser, generateOTP, otpMail)

//get
router.route('/user').get(Auth, getUser)
// router.route('/createResetSession').get(createResetSession)

//put
router.route('/updateUser').put(Auth, updateUser)
router.route('/updatePlan').put(Auth, updatePlan)
router.route('/resetPassword').put(verifyUser, resetPassword)

module.exports = router;