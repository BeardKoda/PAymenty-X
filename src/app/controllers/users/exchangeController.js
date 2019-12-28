const { Exchange, Wallet, Coin } = require('../../models')
const bank = require('../../../config/bank')
var eventer=require('../../events/emitter')
const client = require('../../../config/coin')
const axios = require('axios')

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        response={
            title:'Exchange - Buy / Sell', 
            buys:await Coin.find({buy:true,isDeleted:false}),
            sells:await Coin.find({sell:true,isDeleted:false}),
            pays:await Coin.find({isDeleted:false, pay:true}),
            wallets:await Wallet.find({CSF:{$ne:"USD"},userId:authuser._id}).sort({createdAt:-1})
        }
        // console.log(response)
        res.render('pages/exchange/index', response );
    },

    buy:async(req, res, next)=>{
        authuser = res.locals.user
        const {currency, amount } = req.body
        if(currency && amount && amount >= 0.01){
            if(currency !=="USD"){
                options = {
                    currency1:wallet,
                    currency2:wallet,
                    amount:amount,
                    buyer_email:res.locals.user.email
                }
                data = client.createTransaction(options)
            }else{
                data = bank
            }
            Exchange.create({
                userId:authuser._id,
                type:"buy",
                currency:currency,
                status:"Awaiting",
                data:JSON.stringify(data),
                amount:amount
            }).then((result)=>{
                if(result){
                    msg="Successfully Request to Buy Coin"
                    req.flash('success', msg)
                    res.redirect('/'+res.locals.url+'/exchanges')
                }
            }).catch((err)=>{
                // console.log(err)
                next(err)
            })
        }else{
            msg="Invalid Data"
            req.flash('error', msg)
            res.redirect('/'+res.locals.url+'/buy-sell')
        }
    },

    sell:async(req, res, next)=>{
        authuser = res.locals.user
        const {currency, amount } = req.body
        if(currency && amount && amount >= 0.01){
            // console.log(req.body)
            Exchange.create({
                userId:authuser._id,
                type:"sell",
                currency:currency,
                status:"Awaiting",
                amount:amount
            }).then((result)=>{
                if(result){
                    msg="Successfully Request to Sell Coin"
                    req.flash('success', msg)
                    res.redirect('/'+res.locals.url+'/exchanges')
                }
            }).catch((err)=>{
                // console.log(err)
                next(err)
            })
        }else{
            msg="Invalid Data"
            req.flash('error', msg)
            res.redirect('/'+res.locals.url+'/buy-sell')
        }
    },

}
module.exports = controller