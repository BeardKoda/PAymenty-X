const User = require('../../models/user')
const { USER_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    if(!req.session.userId) {
        res.redirect(`/${USER_URL}/login`)
    }else{
        User.findById(req.session.userId).then((user)=>{
            res.locals.user = user
            next();
        })
    }
};