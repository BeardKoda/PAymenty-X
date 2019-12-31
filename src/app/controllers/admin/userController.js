// const { User } = require('../../models')
const {Wallet} = require('../../models/')
const User = require('../../models/user')
let controller = {
    index :async(req, res, next) => {
        const trans = await User.find({ });
        const active =(await User.find({active:true})).length, deleted=(await User.find({isDeleted:true})).length, suspended=(await User.find({active:false})).length
        let response ={
            title:'All Customers',
            trans, active, suspended, deleted 
        }
        res.render('pages/user/index', response);
    },
    addFund:async(req,res,next)=>{
        const { id } = req.params
        User.findOne({_id:id}).then(async(user)=>{
            if(user){
                response = {
                    title:'Edit', 
                    user:user,
                    wallets:await Wallet.find({userId:id})
                }
                res.render('pages/user/add',response)
            }
        })
    },
    saveFund:async(req,res,next)=>{
        const { wallet, id, amount } = req.body
        console.log(req.body)
        User.findById(id).then((user)=>{
            // console.log(parseInt(amount))
            Wallet.findOne({userId:id, CSF:wallet}).then((wal)=>{
                wal.amount = parseInt(amount)
                if(wal.save()){
                    req.flash('success', "succesfully added")
                    res.redirect('/'+res.locals.url+'/users')
                }
                
            })
        })
    }
}
module.exports = controller