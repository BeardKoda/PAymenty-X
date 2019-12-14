let controller = {
    index :(req, res, next) => {
        res.render('user/auth/login', { title: 'Express' });
        // res.send("login in soon");
    }
}
module.exports = controller