const { ADMIN_URL } = require('../../../config/app')

module.exports = (req,res,next) => {
    res.locals.url = ADMIN_URL
    res.locals.c_url = req.originalUrl
    res.locals.back = req.header('Referer') || '/';
    // console.log(res.locals.c_url, res.locals.url)
    next();
};