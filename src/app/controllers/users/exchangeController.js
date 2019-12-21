const { Exchange } = require('../../models')

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        
        response={
            title: 'Exhange', 
        }
        // console.log(val)
        res.render('pages/exchange/index', response );
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Blank' });
    },

}
module.exports = controller