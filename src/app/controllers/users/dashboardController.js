const { Wallet, Transaction } = require('../../models')
const axios =require('axios')
const Emitter = require('../../events/emitter');

const getRate = async(value) =>{
    // console.log(value)
    try{
        rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
    }catch(err){
      console.log(err)
    }
}
let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        // Wallet.remove().then((res)=>console.log(res))
        const wallet = await Wallet.find({userId: authuser._id }).sort({'_id':-1}).limit(4);
        const transactions = await Transaction.find({userId:authuser._id}).sort({'_id':-1}).limit(3);
        const Ptrans= await Transaction.find({status:"awaiting"})
        const Ctrans= await Transaction.find({status:"Cancelled"})
        const Dtrans= await Transaction.find({status:"Paid"})
        let grandTotal= 0
        let val=[]
        for(const wal of wallet){
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            rate = await getRate(value) * parseInt(wal.amount)
            grandTotal += rate
        }
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
        res.render('pages/index', response );
    },
    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Blank' });
    },

}
module.exports = controller