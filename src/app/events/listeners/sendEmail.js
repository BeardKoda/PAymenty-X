const  transporter = require('../../../config/transporter')
var EmailTemplate = require('email-templates')
var path = require('path')
var { APP_URL } = require('../../../config/app')

module.exports = (data) => {
    setImmediate(() => {
    // Send a welcome email or whatever.
    // console.log(data, APP_URL)
    // if(data.token!=null)
        url = APP_URL+"/user/register/verify/"+data.token
        let mailOptions = {
            // should be replaced with real recipient's account
            from:"contact@coinremits.com",
            to: data.email,
            subject: 'Account Verification - CoinRemits',
            // html:'<div><p>Hello,'+`${data.username}`+'</p><p>Welcome to CoinRemits, </p> <p>Click the <a href="http://localhost:3000/user/register/verify/'+`${data.token}`+'" style="color:green" >http://localhost:3000/user/register/verify/'+`${data.token}`+'</a></p></div>',
            html:`
            <body style="margin: 0; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100% !important; line-height: 1.6em; -webkit-font-smoothing: antialiased; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100% !important; background-color: #f6f6f6;">
            
              <table class="body" style="box-sizing: border-box; background-color: white; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%" bgcolor="white">
                <tbody>
                  <tr>
                    <td class="container" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto !important; max-width: 580px; padding: 10px 0; width: 580px;" width="580" valign="top">
                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px 0;">
            
                        <table class="main signup" style="box-sizing: border-box; background: #ffffff; border: none; border-radius: 3px; font-size: 15px; line-height: 24px; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top">
            
                                <table class="panel" style="box-sizing: border-box; margin-top: 20px; background-color: #f5f5f5; border-radius: 8px; padding: 60px 20px; padding-top: 40px; padding-bottom: 50px; width: 100%; border-collapse: separate !important; mso-table-rspace: 0pt; mso-table-lspace: 0pt;" width="100%" bgcolor="#f5f5f5">
                                  <tbody>
                                    <tr>
                                      <td class="align-center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                                        <h1 style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 600; line-height: 32px; margin: auto; font-size: 24px; text-transform: none; max-width: 400px; margin-bottom: 26px;">Welcome to CoinRemits</h1>
            
                                        <p class="shrink-400" style="font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; max-width: 400px; margin-left: auto; margin-right: auto; margin-bottom: 40px;">
                                          Welcome `+`${data.username}`+`, to CoinRemit where thousands of people are buying, selling, and investing in cryptocurrency, Please Click this link below to activate your account 😍
                                        </p>
                                        <table class="btn btn-primary" cellpadding="0" cellspacing="0" style="box-sizing: border-box; margin: auto; margin-bottom: 10px; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 0px;" valign="top">
                                                <table cellpadding="0" cellspacing="0" class="btn-inner-table" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                                  <tbody>
                                                    <tr>
                                                      <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; background-color: #55b8da; border-radius: 5px; text-align: center; padding-bottom: 0px;" valign="top" bgcolor="#55b8da" align="center">
                                                        <a href="${url}" style="box-sizing: border-box; line-height: 22px; text-decoration: none; background-color: #55b8da; border: solid 1px #348eda; border-radius: 5px; cursor: pointer; color: white; font-size: 17px; font-weight: 500; margin: 0; padding: 12px 38px; text-transform: none; border-color: #55b8da; display: inline-block;" target="_blank">Activate Account</a>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
            
                          </tbody>
                        </table>
            
                        <table class="footer" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="box-sizing: border-box; clear: both; border-collapse: collapse !important; border-spacing: 0 !important; margin: 0 auto; max-width: 660px; table-layout: fixed !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                          <tbody>
                            <tr style="color: #999999; font-size: 12px;">
                              <td align="center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; vertical-align: top; padding: 20px 10px 40px; text-align: center; font-size: 14px; color: grey;" valign="top">
                                <em style="color: #999999; font-size: 12px;">Copyright © 2016 CoinRemits, All rights reserved.</em>
                                <br style="color: #999999; font-size: 12px;">
                                <strong style="color: #999999; font-size: 12px;">Our mailing address is:</strong><br style="color: #999999; font-size: 12px;">
                                <div class="vcard"><span class="org fn">CoinRemits</span>
                                  <div class="adr">
                                    <div class="street-address">Smolenskiy bulvar 30 /32  Moscow  119002  tel  +74992411605</div>
                                    <div class="country-name">Russia.</div>
                                    </div>
                                  </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                    <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
                  </tr>
                </tbody>
              </table>
            </body>`
        };
        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
}