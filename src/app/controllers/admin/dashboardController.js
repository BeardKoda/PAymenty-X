const { Wallet, Transaction } = require('../../models')
const User = require('../../models/user')

let controller = {
    index:async(req,res,next)=>{
        const trans = await Transaction.find({ });
        total = 0,w_total = 0,d_total = 0,
        t =await Transaction.find({}),w =await Transaction.find({type:"widthraw"}),d=await Transaction.find({type:"deposit"})
         d.forEach((f)=>{d_total = d_total+parseInt(f.amount)}), w.forEach((f)=>{w_total=w_total+parseInt(f.amount)}),t.forEach((f)=>{total=total+parseInt(f.amount)})

        const users = await User.find({ });
        // console.log(trans)
        response = {
            trans, users, total, w_total, d_total,
        }
        res.render('pages/index', { title: 'Dashboard', users, trans});
    }
}
module.exports = controller