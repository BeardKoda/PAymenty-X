let controller = {
    index:(req,res,next)=>{
        res.render('pages/index', { title: 'Dashboard' });
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Dashboard' });
    }
}
module.exports = controller