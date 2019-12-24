const { Transaction, Wallet, Coin } = require('../../models')
const client = require('../../../config/coin')
const curency = require('../../../config/currency')
const axios = require('axios')

let controller = {
    index :async(req, res, next) => {
        const trans = await Transaction.find({ });
        const completed =await Transaction.find({status:"Paid"}), pending=await Transaction.find({status:"awaiting"}), cancelled=await Transaction.find({status:"Cancelled"}),
        response ={
            title:'Transactions',
            trans, completed:completed.length, pending:pending.length, cancelled:cancelled.length, 
        }
        res.render('pages/transaction', response);
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
        res.render('pages/transactions/show', response)
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
                trans.status = result.status_text,
                trans.data = JSON.stringify(result),
                trans.save()
                if(result.status_text === "Complete" && trans.status === "Complete"){
                    Wallet.findOne({userId:trans.userId, CSF:trans.currencyTo}).then((wal)=>{
                        // console.log(tranAmount)
                        wal.amount = parseInt(wal.amount)+parseInt(tranAmount)
                        wal.save()
                    }).catch((err)=>{
                        console.log(err)
                    })
                    final = await Transaction.findOne({_id:id})
                    final.status = "Paid",
                    final.save()
                    res.send(result)
                }else{
                    final = await Transaction.findOne({_id:id})
                    final.status = 'Cancelled'
                    final.save()
                    res.send(result)
                }
            }else{
                res.send('Transaction Already Verified')
            }
        }).catch((err)=>{console.log(err)})
    }

}
module.exports = controller