const { Wallet, Transaction } = require('../../models')
var moment = require('moment');

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        // Wallet.remove().then((res)=>console.log(res))
        const wallet = await Wallet.find({userId: authuser._id }).sort({'_id':-1}).limit(4);
        const transactions = await Transaction.find({userId:authuser._id}).sort({'_id':-1}).limit(3);
        const Ptrans= await Transaction.find({status:"awaiting"})
        const Ctrans= await Transaction.find({status:"cancelled"})
        const Dtrans= await Transaction.find({status:"completed"})
        let grandTotal= 0
        let val=[]
        wallet.forEach((wal)=>{
            grandTotal= grandTotal + wal.amount * 150
            val[wal.CSF]= wal.amount*150
            // await client.convertLimits(options);
        })
        
        response={
            title: 'Dashboard', 
            wallets:wallet,
            trans:transactions,
            Ptrans:Ptrans.length,
            Ctrans:Ctrans.length,
            Dtrans:Dtrans.length,
            grandTotal,
            val
        }
        // console.log(val)
        res.render('pages/index', response );
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Blank' });
    },

}
module.exports = controller