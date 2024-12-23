const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

// post: /api/generateOTP
const generateOTP = async (req, res, next) => {
  try {
    // const { id, email, firstName } = req.user;
    const { email } = req.body;
    userModel.findOne({ email : email })
    .then(async(userData) => {
      if(!userData) return res.status(501).send({msg : 'Can not find user'});
      const { password, ...rest } = Object.assign({}, userData.toJSON());
      // Calculate expiration time (e.g., 5 minutes from now)
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5); // Set expiration time to 5 minutes from now
      console.log(email);
      let user = await otpModel.findOne({ email });
      if (user) {
        // User exists, update OTP
        const OTP = await otpGenerator.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        console.log(OTP);
        await otpModel.updateOne({ email }, { otp: OTP, expirationTime: expirationTime });
        // return res.status(201).send({ msg: "OTP Updated" });7
        req.user = {
          firstName: rest.firstName,
          userEmail: email,
          otp: OTP,
        };
        next();
      } else {
        // User doesn't exist, create new user with OTP
        const OTP = await otpGenerator.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        const newUser = new otpModel({
          id: rest._id,
          email: email,
          otp: OTP,
          expirationTime: expirationTime
        });
        await newUser.save();
        // return res.status(201).send({ msg: "New User OTP sent successfully" });
        req.user = {
          firstName: rest.firstName,
          userEmail: email,
          otp: OTP,
        };
        next();
      }
    })
    .catch(e => {
        return res.status(400).send({msg : 'Can not get user data'})
    }) 
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

// post: /api/verifyOTP
const verifyOTP = async (req, res) => {
  const { code, email } = req.body;
  console.log(email, code);
  try {
    const user = await otpModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not registered" });
    }
    if (code !== user.otp) {
      return res.status(400).send({ msg: "Code does not match" });
    }
    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    await otpModel.findOneAndUpdate({ email }, { otp: null });
    return res.status(200).send({
      msg: "Login Successful...!",
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

// post: /api/verifyResetOTP
const verifyResetOTP = async (req, res) => {
  const { code, email } = req.body;
  console.log(email, code);
  try {
    const user = await otpModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not registered" });
    }
    if (code !== user.otp) {
      return res.status(400).send({ msg: "Code does not match" });
    }
    await otpModel.findOneAndUpdate({ email }, { otp: null });
    return res.status(200).send({
      msg: "Verified..!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { generateOTP, verifyOTP, verifyResetOTP };
