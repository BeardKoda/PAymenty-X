const { ADMIN_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    if(req.session.adminId) {
        res.redirect(`/${ADMIN_URL}`)
    } else {
        next();
    }
};