module.exports = (req,res,next) => {
    if(req.session.userId) {
        // res.end('GET method not supported');/
        res.redirect('/user/')
    } else {
        next();
    }
};