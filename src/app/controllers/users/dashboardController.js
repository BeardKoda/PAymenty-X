const { Wallet, Transaction } = require('../../models')
const axios =require('axios')
const Emitter = require('../../events/emitter');

const getRate = async(value) =>{
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
    return rate.data.market_data.current_price.usd
}

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        // Wallet.remove().then((res)=>console.log(res))
        const wallet = await Wallet.find({userId: authuser._id,CSF:{$ne:"USD"}}).sort({'_id':-1}).limit(4);
        const transactions = await Transaction.find({userId:authuser._id}).sort({'_id':-1}).limit(3);
        const Ptrans= await Transaction.find({status:"awaiting"})
        const Ctrans= await Transaction.find({status:"Cancelled"})
        const Dtrans= await Transaction.find({status:"Paid"})
        let grandTotal= 0
        let val=[]
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

    getApiData:async(req,res,next)=>{
        var grandTotal= 0
        authuser = res.locals.user
        const wallet = await Wallet.find({userId: authuser._id,CSF:{$ne:"USD"} }).sort({'_id':-1}).limit(4);
        for(const wal of wallet){
            value = wal.CSF !== 'LTCT' && wal.CSF !=='USD'? wal.currency.toLowerCase():'bitcoin'
            rate = await getRate(value) * parseFloat(wal.amount)
            grandTotal += rate
        }
        return res.status(200).json({grandTotal, wallet})
    },

    blank:(req,res,next)=>{
        res.render('pages/blank', { title: 'Blank' });
    },
}
module.exports = controller