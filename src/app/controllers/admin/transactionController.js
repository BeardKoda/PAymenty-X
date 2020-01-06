const { Transaction, Wallet, Coin } = require('../../models')
const client = require('../../../config/coin')
const axios = require('axios')

let controller = {
    index :async(req, res, next) => {
        const trans = await Transaction.find({type:"Deposit"}).sort({createdAt: -1})
        const completed =await Transaction.find({type:"Deposit", status:"Paid"}), pending=await Transaction.find({type:"Deposit",status:"awaiting"}), cancelled=await Transaction.find({type:"Deposit", status:"Cancelled"}),
        response ={
            title:'Deposits',
            trans, completed:completed.length, pending:pending.length, cancelled:cancelled.length, 
        }
        res.render('pages/transaction/deposit', response);
    },

    Windex :async(req, res, next) => {
        const trans = await Transaction.find({ type:"Withdraw"}).sort({createdAt: -1})
        const completed =await Transaction.find({type:"Withdraw",status:"Paid"}), pending=await Transaction.find({type:"Withdraw",status:"awaiting"}), cancelled=await Transaction.find({type:"Withdraw",status:"Cancelled"}),
        response ={
            title:'Withdrawals',
            trans, completed:completed.length, pending:pending.length, cancelled:cancelled.length, 
        }
        res.render('pages/transaction/withdraw', response);
    },

    getRates:async(req,res,next)=>{
        await curency.forEach((cur)=>{
        value = cur.tag !== 'LTCT'? cur.name.toLowerCase():'bitcoin'
        console.log(value, cur.tag)
            axios.get('https://api.coingecko.com/api/v3/coins/'+value).then((rate)=>{
            Coin.findOne({CSF:cur.tag}).then(async(response)=>{
                    USD = rate.data.market_data.current_price.usd
                    if(response===null){
                    Coin.create({
                        currency:cur.name,
                        CSF:cur.tag,
                        amount:USD
                    })
                    }else{
                        response.amount = USD
                        response.save()
                    }
            })
            }).catch((err)=>console.log("error"))
        })
        await res.send('refreshed')
    },

    show:async(req,res,next)=>{
        let {id} = req.params
        const trans = await Transaction.find({_id:id})
        // console.log(trans[0])
        response={
            title:"Transaction",
            trans:trans[0]
        }
        res.render('pages/transaction/show', response)
    },

    getTX:async(req, res, next)=>{
        let {id} = req.params
        Transaction.findOne({_id:id}).then(async(trans)=>{
            // if(err) res.send('error')
            // console.log(trans.TxId, trans.amount)
            let tranAmount = trans.amount
            options={
                txid:trans.TxId,
                full:1
            }
            if(trans.status !== "Paid"){
                result = await client.getTx(options);
                // res.send(result)
                if(result.status===100){
                    Wallet.findOne({userId:trans.userId, CSF:trans.currencyTo}).then((wal)=>{
                        wal.amount = parseFloat(wal.amount)+parseFloat(tranAmount)
                        wal.save()
                        // console.log(wal.amount)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    final = await Transaction.findOne({_id:id})
                    final.status = "Paid",
                    final.data=JSON.stringify(result),
                    final.save()
                    req.flash('success', "Successfully Verified")
                    res.redirect("/"+res.locals.url+"/transactions/deposits")
                }else if(result.status===0){
                    final = await Transaction.findOne({_id:id})
                    final.status = result.status_text
                    final.data=JSON.stringify(result)
                    final.save()
                    req.flash('success', "Successfully Verified")
                    res.redirect("/"+res.locals.url+"/transactions/deposits")
                }else {
                    final = await Transaction.findOne({_id:id})
                    final.status = 'Cancelled'
                    final.data=JSON.stringify(result)
                    final.save()
                    req.flash('success', "Successfully Verified")
                    res.redirect("/"+res.locals.url+"/transactions/deposits")
                }
            }else{
                req.flash('error', "Transaction Verified Already")
                res.redirect("/"+res.locals.url+"/transactions/deposits")
            }
        }).catch((err)=>{console.log(err)})
    },

    approveWi:async(req,res,next)=>{
        let {id} = req.params
        trans = await Transaction.findOne({_id:id})
        trans.status = "Paid"
        if(trans.save()){
            wallet = await Wallet.findOne({userId:trans.userId, CSF:trans.currencyTo})
            tran = await Transaction.findOne({_id:id})
            wallet.amount = parseFloat(wallet.amount) - parseFloat(tran.amount)
            // console.log(wallet, tran)
            if(wallet.save()){
                req.flash('success', "Successfully Approved")
                res.redirect("/"+res.locals.url+"/transactions/withdraws")
            }
        }
       
        // options = {
        //     amount:amount,
        //     currency,currency,
        //     add_tx_fee:1,
        //     address:address,
        //     auto_confirm:0
        // }
        // trans = await client.createWithdrawal(options);
        // res.send(trans)
    },
    
    getWithdr:async(req,res,next)=>{
        id = req.body.id
        options = {
            id:id
        }
       trans = await client.getWithdrawalInfo(options);
       res.send(trans)
    }
}
module.exports = controller