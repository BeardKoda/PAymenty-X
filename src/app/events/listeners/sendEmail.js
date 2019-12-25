const  transporter = require('../../../config/transporter')
var EmailTemplate = require('email-templates')
var path = require('path')

module.exports = (data) => {
    setImmediate(() => {
    // Send a welcome email or whatever.
    console.log(data)
        let mailOptions = {
            // should be replaced with real recipient's account
            from:"info@paystripe.com",
            to: data.email,
            subject: 'Account Verification - PayCom',
            html:'<div><p>Hello,'+`${data.username}`+'</p><p>Welcome to Payment Coin, </p><p>Click the <a href="http://localhost:3000/user/register/verify/'+`${data.token}`+'" style="color:green" >http://localhost:3000/user/register/verify/'+`${data.token}`+'</a></p></div>',
            headers: {
                'Content-Type':"html"
            }
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
}