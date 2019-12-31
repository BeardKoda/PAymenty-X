const { Wallet, Coin } = require('../../models')
const axios =require('axios')

const getRate = async(value) =>{
    axios.get('https://api.coingecko.com/api/v3/coins/'+value).then((rate)=>{
        return rate.data.market_data.current_price.usd
    }) 
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
        console.log(wallet)
        response =  { title: 'Wallets', wallets:wallet, grandTotal}
        res.render('pages/wallet/index',response);
    },

    add:async(req,res,next)=>{
        response={
            title:"Add New Coin Wallet",
            coins:await Coin.find({isDeleted:false})
        }
        res.render('pages/wallet/add', response)
    },
    generate:(req,res,next)=>{
        Coin.find({isDeleted:false}).then((currency)=>{
            if(currency.length > 0){
                currency.forEach((cur)=>{
                    Wallet.findOne({userId:authuser._id,CSF:cur.tag}).then((response)=>{
                    if(response===null){
                        Wallet.create({
                        userId:authuser._id,
                        type:"crypto",
                        currency:cur.name,
                        CSF:cur.tag,
                        amount:"0"
                        })
                    }
                    })
                })
                req.flash('success', 'Successfully Generated Wallets')
                res.redirect('/'+res.locals.url+'/wallet')
            }else{
                req.flash('error', 'No Coin Available for Generating Wallets')
                res.redirect('/'+res.locals.url+'/wallet')
            }
        })
    }
}
module.exports = controller