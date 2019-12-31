const { Wallet, Transaction } = require('../../models')
const User = require('../../models/user')
const axios = require('axios')

const getRate = async(value) =>{
    // console.log(value)
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
}
let controller = {
    index:async(req,res,next)=>{
        const trans = await Transaction.find({ });
        const users = await User.find({});
        response = {
            title: 'Dashboard', trans, users
        }
        res.render('pages/index', response);
    },
    getAxioData:async(req,res,next)=>{
        const trans = await Transaction.find({ });
        total = 0,w_total = 0,d_total = 0
         let grandTotal= 0
         for(const t of trans){
            wal = await Wallet.findOne({CSF:t.currencyTo})
            value = wal.CSF !== 'LTCT'? wal.gid:'bitcoin'
            rate = await getRate(value) * parseInt(t.amount)
            d_total = t.type === 'Deposit' ? d_total+rate : d_total
            w_total = t.type === 'Withdraw' ? w_total+rate : w_total
            grandTotal += rate
        }
        return res.status(200).json({grandTotal,total, w_total, d_total})
    },
    setting:(req,res,next)=>{
        response={
            title:"Setting"
        }
        res.render('pages/setting', response);
    }
}
module.exports = controller