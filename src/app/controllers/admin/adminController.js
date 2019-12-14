let controller = {
    index :(req, res, next) => {
        res.render('auth/login', { title: 'Dashboard' });
        // res.send("login in soon");
    }
}
module.exports = controller