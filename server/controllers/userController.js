const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator')

//middleware to verify user
async function verifyUser(req, res, next){
    try{
        const {email} = req.body;
        //check the user existance
        let exist  = await userModel.findOne({email});
        if(!exist) return res.status(404).send({msg : 'Can not find user!'});
        next();
    }catch(e){
        return res.status(404).send({msg : 'Authentication error'})
    }
}

//post: /api/register
const register = async (req, res) => {
    try{
        const {firstName, lastName, email, countryCode, phoneNumber, address, city, state, country, password} = req.body;

        //checck existing user
        const existEmail = new Promise((resolve, reject) => {
            userModel.findOne({ email }).then((email) => {
                if(email) reject({ msg : "Please use different emailID"});
                console.log(email);
                resolve();
            }).catch(error => reject({error}));
        });

        existEmail.then(() => {
            if(password){
                bcrypt.hash(password, 10)
                .then( hashedpassword => {
                    const user = new userModel({
                        firstName,
                        lastName,
                        email,
                        password: hashedpassword,
                        countryCode,
                        phoneNumber,
                        address,
                        city,
                        state,
                        country
                    });

                    //return save result as a response
                    user.save().then(result => res.status(201).send({msg: "User registration successful"}))
                    .catch(error => res.status(500).send({error}))
                }).catch(error => {
                        return res.status(500).send({
                        error : "Enable to hashed password"
                    })
                })
            }
        }).catch(error => {
            return res.status(500).send({error})
        })
    }catch (error) {
        return res.status(500).send(error);
    }
}

//post: /api/login
const login = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        userModel.findOne({ email })
        .then(user => {
            bcrypt.compare(password, user.password)
            .then(passwordCheck => {
                if(!passwordCheck) return res.status(400).send({msg: 'Wrong password'})

                //create jwt token
                // const token = jwt.sign({
                //     userId: user._id,
                //     email: user.email
                // }, process.env.JWT_SECRET, { expiresIn : "2h" });

                // return res.status(200).send({
                //     msg: "Login Successful...!",
                //     id: user._id,
                //     email: user.email,
                //     firstName: user.firstName,
                //     // token
                // })
                // req.user = {
                //     id: user._id,
                //     email: user.email,
                //     firstName: user.firstName,
                // }
                // next();
                return res.status(201).send({msg: 'ok'});
            })
            .catch(e => {
                return res.status(400).send({msg : 'Password does not Match'})
            })
        })
        .catch(err => {
            return res.status(404).send({msg : 'User not resgistered'})
        })
    }catch (err) {
        return res.status(500).send({err})
    }
}

//get: /api/user/id
const getUser = async (req, res) => {
    const { userId } = req.user;
    try {
        if(!userId) return res.status(501).send('Invalid user');
        console.log(userId);
        userModel.findOne({ _id : userId })
        .then((user) => {
            if(!user) return res.status(501).send({msg : 'Can not find user'});

            //remove password from user
            //mongoose return unneccessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());
            return res.status(201).send(rest);
        })
        .catch(e => {
            return res.status(400).send({msg : 'Can not get user data'})
        })
    } catch (error) {
        return res.status(404).send({msg : 'Can not find user data!'});
    }
}

// put: /api/updateUser
const updateUser = async (req, res) => {
    try {
        // const id = req.query.id;
        const { userId } = req.user;
        console.log(userId);
        if(userId){
            const body = req.body;
            // update the data
            console.log(userId);
            console.log(body);
            userModel.updateOne({ _id : userId }, body)
            .then(() => {
                return res.status(201).send({ msg : "Record Updated...!"});
            })
            .catch(e => {
                return res.status(400).send({ msg : 'Can not find user'})
            })
        }else{
            return res.status(401).send({ msg : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

// put: /api/updatePlan
const updatePlan = async (req, res) => {
    try {
        // const id = req.query.id;
        const { userId } = req.user;
        console.log(userId);
        if(userId){
            const body = req.body;
            // update the data
            console.log(userId);
            console.log(body);
            userModel.updateOne({ _id : userId }, body)
            .then(() => {
                return res.status(201).send({ msg : "Added Plan To Your Account...!"});
            })
            .catch(e => {
                return res.status(400).send({ msg : 'Can not find user'})
            })
        }else{
            return res.status(401).send({ msg : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

// put: /api/resetPassword
const resetPassword = async (req, res) => {
    try {
        // if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});
        const { email, password } = req.body;
        try {
            userModel.findOne({ email})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            userModel.updateOne({ email : user.email }, { password: hashedPassword})
                            .then(() => {
                                // req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Password Updated...!"})
                            })
                            .catch( e => {
                                return res.status(500).send({
                                    error : "Enable to update password"
                                })
                            })
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

module.exports = {register, login, verifyUser, getUser, updateUser, updatePlan, resetPassword};


// // get: /api/generateOTP
// const generateOTP = async (req, res) => {
//     req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
//     res.status(201).send({ code: req.app.locals.OTP })
// }

// // get: /api/verifyOTP
// const verifyOTP = async (req, res) => {
//     const { code } = req.query;
//     if(parseInt(req.app.locals.OTP) === parseInt(code)){
//         req.app.locals.OTP = null; // reset the OTP value
//         req.app.locals.resetSession = true; // start session for reset password
//         return res.status(201).send({ msg: 'Verify Successsfully!'})
//     }
//     return res.status(400).send({ error: "Invalid OTP"});
// }
// // get: /api/createResetSession
// const createResetSession = async (req, res) => {
//     if(req.app.locals.resetSession){
//         return res.status(201).send({ flag : req.app.locals.resetSession})
//    }
//    return res.status(440).send({error : "Session expired!"})
// }