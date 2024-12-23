const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

let config = {
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "The Elite International",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/otpMail
 * @param: {
  "firstName" : "example123",
  "userEmail" : "admin123"
}
*/
const otpMail = async (req, res) => {
    const { firstName, userEmail, otp} = req.user;
    const { subject } = req.body;
    // body of the email
    var email = {
        body : {
            name: firstName,
            intro : `Please find your The Elite International verfiation code:  <b>${otp}</b>`,
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : process.env.EMAIL,
        to: userEmail,
        subject : subject || "Login verification code.",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(201).send({ msg: "OTP sent to your mail!"})
        })
        .catch(error => res.status(500).send({error }))

}

/** POST: http://localhost:8080/api/registerMail
 * @param: {
  "firstName" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
const registerMail = async (req, res) => {
    const { firstName, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: firstName,
            intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : process.env.EMAIL,
        to: userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(201).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}

module.exports = {registerMail, otpMail}