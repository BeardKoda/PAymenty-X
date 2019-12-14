let controller = {
    index :(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
        // res.send("login in soon");
    }
}
module.exports = controller