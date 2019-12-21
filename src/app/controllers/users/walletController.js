const { Wallet } = require('../../models')

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        const wallet = await Wallet.find({userId: authuser._id });
        // console.log(wallet)
        res.render('pages/wallet', { title: 'Wallets', wallets:wallet});
    }
}
module.exports = controller