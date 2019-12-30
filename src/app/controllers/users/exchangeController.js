const { Exchange, Wallet, Coin, Udata } = require('../../models')
const bank = require('../../../config/bank')
var eventer=require('../../events/emitter')
const client = require('../../../config/coin')
const axios = require('axios')

const getRate = async(value) =>{
    // console.log(value)
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
}

const verfiyAmount = async(coin, amount, user)=>{
    wal = await Wallet.findOne({userId:user._id, CSF:coin})
    if(amount > wal.amount){
        console.log(wal)
        return result = {
            msg:'You don\'t have enough '+coin+' to sell',
            error:true
        }
    }else{
        return result = {error:false}
    }
}

let controller = {
    index:async (req,res,next)=>{
        authuser = res.locals.user
        response={
            title:'Exchange - Buy / Sell', 
            buys:await Coin.find({buy:true,isDeleted:false}),
            sells:await Coin.find({sell:true,isDeleted:false}),
            pays:await Coin.find({isDeleted:false, pay:true}),
            wallets:await Wallet.find({CSF:{$ne:"USD"},userId:authuser._id}).sort({createdAt:-1}),
            tab:"buy"
        }
        req.locals.tab = req.locals.tab ? req.locals.tab :'buy'
        // console.log(response)
        res.render('pages/exchange/index', response );
    },

    getPay:async(req, res,next)=>{
        id = req.params.id
        // res.send(id)
        try{
            data = await Exchange.findOne({_id:id})
            result = {
                title:'Send Payment',
                response:JSON.parse(data.data), 
                payurl:"exchange",
                id
            }
            res.render('pages/deposit/pay', result)
        }catch(err){
            msg="Data doesn't Exist"
            req.flash('error', msg)
            res.redirect('/'+res.locals.url+'/exchange')
        }
    },

    buy:async(req, res, next)=>{
        authuser = res.locals.user
        const {Bcurrency, Pcurrency, amount } = req.body
        if(Bcurrency && Pcurrency && amount && amount >= 1){
            if(Pcurrency !=="USD"){
                options = {
                    currency1:Bcurrency,
                    currency2:Pcurrency,
                    amount:amount,
                    buyer_email:res.locals.user.email
                }
                data = await client.createTransaction(options)
            }else{
                data = bank
            }
            try{
                let result = await Exchange.create({
                    userId:authuser._id,
                    type:"buy",
                    currencyTo:Bcurrency,
                    currencyFrom:Pcurrency,
                    status:"Awaiting",
                    data:JSON.stringify(data),
                    amount:amount
                })
            // .then((result)=>{
                if(result){
                    if(Pcurrency!=='USD'){
                        id=result._id
                        msg="Successfully Request to Buy Coin"
                        req.flash('success', msg)
                        res.redirect('/'+res.locals.url+'/exchange/pay/'+id)
                    }else{
                        msg="Successfully Request to Buy Coin"
                        req.flash('success', msg)
                        res.redirect('/'+res.locals.url+'/exchange/')
                    }
                }
            }catch(err){
                // console.log(err)
                next(err)
            }
        }else{
            msg="Invalid Data"
            req.flash('error', msg)
            res.redirect('/'+res.locals.url+'/buy-sell')
        }
    },
    sell:async(req, res, next)=>{
        authuser = res.locals.user
        const {Scurrency, Pcurrency, amount } = req.body
        let valid = await verfiyAmount(Scurrency, amount, authuser)
        if(!valid.error){
            try{
                result = await Exchange.create({
                    userId:authuser._id,
                    type:"sell",
                    currencyTo:Scurrency,
                    currencyFrom:Pcurrency,
                    status:"Awaiting",
                    amount:amount
                })
                if(result){
                    if(Pcurrency=='USD'){
                        id=result._id
                        profile = await Udata.findOne({_uid:authuser._id})
                        if(profile.AccountDetails==null){
                            // console.log(res.locals.l.query)
                            msg="Transaction is Propcessing!!  Setup Your Account Details Below"
                            req.flash('success', msg)
                            // res.locals.l.query = {
                            //     tab:"account"
                            // }
                            res.redirect('/'+res.locals.url+'/settings?tab=account')
                        }else{
                            // console.log('profile')
                            msg="Your Transaction is Processing!"
                            req.flash('success', msg)
                            res.redirect('/'+res.locals.url+'/exchange')
                        }
                    }else{
                        msg="Your Transaction is Processing!"
                        req.flash('success', msg)
                        res.redirect('/'+res.locals.url+'/exchange')
                    }
                }
            }catch(err){
                next(err)
            }
        }else{
            msg="Invalid Data"
            req.flash('error', valid.msg)
            req.query.tab = 'sell'
            res.redirect('/'+res.locals.url+'/buy-sell')
        }
    },

    getBuy:async(req,res,next)=>{
        var total=0;
        var Ltotal = 0
        authuser = res.locals.user
        trans = await Exchange.find({userId: authuser._id, type:'buy'}).sort({createdAt: -1})
        console.log(trans)
        if(trans.length > 0){
            wal = await Wallet.findOne({CSF:trans[0].currencyTo})
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            Ltotal = await getRate(value) * parseInt(trans[0].amount)
            for (const t of trans) {
                wal = await Wallet.findOne({CSF:t.currencyTo})
                console.log(t, wal)
                value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
                rate = await getRate(value) * parseInt(t.amount)
                total += rate
            }
        }
        res.render('pages/exchange/buy', {title:'Buy Request History', trans, total, Ltotal})
    },
    getSell:async(req,res,next)=>{
        var total=0;
        var Ltotal = 0
        authuser = res.locals.user
        trans = await Exchange.find({userId: authuser._id, type:'sell'}).sort({createdAt: -1})
        // console.log(trans)
        if(trans.length > 0){
            wal = await Wallet.findOne({CSF:trans[0].currencyTo})
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            Ltotal = await getRate(value) * parseInt(trans[0].amount)
            for (const t of trans) {
                wal = await Wallet.findOne({CSF:t.currencyTo})
                console.log(t, wal)
                value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
                rate = await getRate(value) * parseInt(t.amount)
                total += rate
            }
        }
        console.log(total, Ltotal,trans)
        // res.send(Ltotal)
        // res.status(200).json(trans)
        res.status(200).render('pages/exchange/sell', {title:'Sell Request History', trans, total, Ltotal})
    },
}
module.exports = controller