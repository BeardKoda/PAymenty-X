const { Wallet, Coin, Udata } = require('../../models')
const axios =require('axios')

const getRate = async(value) =>{
    axios.get('https://api.coingecko.com/api/v3/coins/'+value).then((rate)=>{
        return rate.data.market_data.current_price.usd
    }) 
}

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        const prof = await Udata.findOne({_uid:authuser._id});
        const wallet = await Wallet.find({userId: authuser._id });
        const walletw = await Wallet.findOne({userId: authuser._id,gid:'bitcoin' });
        grandTotal = 0
        
        // console.log(walletw.amount,'here')
        response =  { title: 'Wallets', wallets:wallet, grandTotal,prof}
        // if(parseInt(walletw.amount) === '0'){
            req.flash('success', 'Account has been verified and secured with 2FA')
        // }
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
        authuser=res.locals.user
        Coin.find({isDeleted:false}).then((currency)=>{
            if(currency.length > 0){
                currency.forEach((cur)=>{
                    Wallet.findOne({userId:authuser._id,CSF:cur.tag}).then((response)=>{
                    if(response===null){
                        // console.log(currency)
                        Wallet.create({
                        userId:authuser._id,
                        type:"crypto",
                        currency:cur.name,
                        CSF:cur.tag,
                        gid:cur.gid,
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