let controller = {
    loginForm :(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
    },
    login:(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
        // res.send("login in soon");
    }
}
module.exports = controller