const { ADMIN_URL } = require('../../../config/app')
const { Admin } = require('../../models')

module.exports = (req,res,next) => {
    if(!req.session.adminId) {
        res.redirect(`/${ADMIN_URL}/login`)
    } else {
        Admin.findById(req.session.adminId).then((user)=>{
            if(user.super){
                res.redirect(res.locals.back)
            }
            next();
        })
    }
};