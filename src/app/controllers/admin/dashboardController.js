let controller = {
    index:(req,res,next)=>{
        console.log("loggedIn")
        res.render('pages/index', { title: 'Dashboard' });
    }
}
module.exports = controller