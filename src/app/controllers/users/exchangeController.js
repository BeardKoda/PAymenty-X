const { Exchange } = require('../../models')

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        
        response={
            title: 'Exchange - Buy / Sell', 
        }
        // console.log(val)
        res.render('pages/exchange/index', response );
    },

}
module.exports = controller