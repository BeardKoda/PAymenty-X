const { ADMIN_URL } = require('../../../config/app')
const { Admin } = require('../../models')

module.exports = (req,res,next) => {
    if(!req.session.adminId) {
        // res.end('GET method not supported');/
        res.redirect(`/${ADMIN_URL}/login`)
    } else {
        Admin.findById(req.session.adminId).then((user)=>{
            res.locals.user = user
            res.locals.url = ADMIN_URL
            next();
        })
    }
};