const nodeMailer = require('nodemailer')
const { MAIL } = require("./app")
options ={
    host: MAIL.HOST || 'smtp.gmail.com',
    port: MAIL.PORT|| 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: MAIL.USER || 'guardianplus6@gmail.com',
        pass: MAIL.PASS || 'Josuha332512'
    }
}
const transporter = nodeMailer.createTransport(options)
module.exports = transporter
