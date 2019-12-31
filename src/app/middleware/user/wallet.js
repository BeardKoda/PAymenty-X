const User = require('../../models/user')
const { Wallet} = require('../../models')
const { USER_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    if(!req.session.userId) {
        res.redirect(`/${USER_URL}/login`)
    }else{
        Wallet.find({userId:req.session.userId}).then((result)=>{
            if(result == 0){
                req.flash("error", "Please Generate Wallet")
                res.redirect('/'+res.locals.url+"/wallet")
            }
        })
    }
};