const { Transaction, Wallet, Coin } = require('../../models')
const client = require('../../../config/coin')
const axios = require('axios')

const getRate = async(value) =>{
    // console.log(value)
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
}

let controller = {
    Dindex:async(req,res,next)=>{
        var total=0;
        var Ltotal = 0
        authuser = res.locals.user
        trans = await Transaction.find({userId: authuser._id, type:'Deposit'}).sort({createdAt: -1})
        if(trans.length > 0){
            wal = await Wallet.findOne({CSF:trans[0].currencyTo})
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            Ltotal = await getRate(value) * parseInt(trans[0].amount)
            for (const t of trans) {
                wal = await Wallet.findOne({CSF:t.currencyTo})
                value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
                rate = await getRate(value) * parseInt(t.amount)
                total += rate
            }
        }
        res.render('pages/transaction/deposit', {title:'Deposit History', trans, total, Ltotal})
    },

    Windex:async(req,res,next)=>{
        total=0
        Ltotal=0
        authuser = res.locals.user
        trans = await Transaction.find({userId: authuser._id, type:'Withdraw'}).sort({createdAt: -1})
        if(trans.length > 0){
            wal = await Wallet.findOne({CSF:trans[0].currencyTo})
            value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
            Ltotal = await getRate(value) * parseInt(trans[0].amount)
        
            for (const t of trans) {
                wal = await Wallet.findOne({CSF:t.currencyTo})
                value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
                rate = await getRate(value) * parseInt(t.amount)
                total += rate
            }
        }
        res.render('pages/transaction/withdraw', {title:'Withdrawal History', trans, total, Ltotal})
    },

    showDeposit:async(req,res,next)=>{
        response = {
            title:'Deposit', 
            coins:await Coin.find({tag:{ $ne: "USD"}, isDeleted:false}),
            wallets:await Wallet.find({CSF:{$ne:"USD"}}).sort({createdAt:-1})
        }
        res.render('pages/deposit/index',response)
    },

    showWithdraw:(req,res,next)=>{
        res.render('pages/withdraw/index', {title:'Withdraw'})
    },

    postDeposit:async(req,res, next)=>{
        const {amountBTC,amountUSD, currency, wallet} = req.body
        // res.send(req.body)
        if(amountUSD && amountBTC && currency && wallet){
            console.log(req.body)
            options = {
                currency1:currency,
                currency2:wallet,
                amount:amountBTC,
                buyer_email:res.locals.user.email
            }
            client.createTransaction(options).then((response)=>{
                Transaction.create({
                    userId:res.locals.user._id,
                    type:"Deposit",
                    currencyFrom:currency,
                    currencyTo:wallet,
                    address:response.address,
                    TxId:response.txn_id,
                    status:"awaiting",
                    data:JSON.stringify(response),
                    amount:req.body.amountBTC
                }).then((trans)=>{
                    var id=trans._id
                    req.flash('success', "Deposit request created")
                    res.render('pages/deposit/pay', {title:'Send Payment', response, id})
                }).catch((err)=>{
                    console.log(err)
                    req.flash('error', err.message)
                    res.redirect(res.locals.back)
                })
            }).catch((err)=>{
                req.flash('error', err.message)
                res.redirect(res.locals.back)
            })
        }else{
            req.flas('error', 'missing parameters')
            res.back()
        }
},

    verify:(req,res,next)=>{
        res.send(req.body)

    },
    showPay:async(req,res,next)=>{
        res.send(req.body)
        trans = await Transaction.findOne({_id:id})
        response = JSON.parse(trans.data)
        res.render('pages/deposit/pay', {title:'Send Payment', response})
    },

    postWithdraw:(req, res, next)=>{
        const {currency, wallet, amount, address} = req.body
        // res.send(req.body)
        Transaction.create({
            userId:res.locals.user._id,
            type:"Withdraw",
            currencyFrom:wallet,
            currencyTo:currency,
            address:address,
            TxId:" ",
            status:"awaiting",
            amount:amount
        }).then((result)=>{
            // console.log(result)
            req.session.success = "Widrawal request Successfully created wait validation"
        res.render('pages/withdraw/process',{title:'Withdrawal Processing'})
        }).catch((err)=>{
            // console.log(err)
            req.flash('error', err)
            res.redirect('withdraw')
        })
    },
}
module.exports = controller