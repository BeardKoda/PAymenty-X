const { Wallet } = require('../../models')

let controller = {
    index:async (req,res,next)=>{
        // authuser = res.locals.user
        // Wallet.remove().then((res)=>console.log(res))
        // const wallet = await Wallet.find({userId: authuser._id });
        // console.log(wallet)
        
        res.render('pages/profile', { title: 'Profile'});
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Dashboard' });
    }
}
module.exports = controller