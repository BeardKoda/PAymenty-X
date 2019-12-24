const { Wallet } = require('../../models')
const axios =require('axios')

const getRate = async(value) =>{
    console.log(value)
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
}
let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        const wallet = await Wallet.find({userId: authuser._id });
        grandTotal = 0
        for(const wal of wallet){
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            rate = await getRate(value) * parseInt(wal.amount)
            grandTotal += rate
        }
        // console.log(wallet)
        res.render('pages/wallet', { title: 'Wallets', wallets:wallet, grandTotal});
    }
}
module.exports = controller