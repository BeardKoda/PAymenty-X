const { USER_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    res.locals.url = USER_URL,
    res.locals.c_url = req.originalUrl
    next();
};