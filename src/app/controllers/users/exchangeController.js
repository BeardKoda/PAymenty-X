const { Exchange, Wallet } = require('../../models')
const currency = require('../../../config/currency')

var eventer=require('../../events/emitter')

let controller = {
    index:async (req,res,next)=>{
        // eventer.emit('test', 'Buy now')
        authuser = res.locals.user
        response={
            title: 'Exchange - Buy / Sell', 
            coins: currency,
            wallets:await Wallet.find({userId:authuser._id})
        }
        // eventer.emit('tested', "hee")
        // console.log(val)
        res.render('pages/exchange/index', response );
    },
    buy:async(req, res, next)=>{
        
    },
    sell:async(req, res, next)=>{
        
    }

}
module.exports = controller