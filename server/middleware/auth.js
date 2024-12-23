const jwt = require('jsonwebtoken');

/** auth middleware */
const Auth = async (req, res, next) => {
    try {
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        console.log(decodedToken);
        // res.json(decodedToken)

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

module.exports = { Auth, localVariables };