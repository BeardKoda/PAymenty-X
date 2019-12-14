const { USER_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    if(!req.session.userId) {
        console.log("no logged")
        // res.end('GET method not supported');/
        res.redirect(`/${USER_URL}/login`)
    } else {
        next();
    }
};