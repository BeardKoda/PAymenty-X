const { Transaction } = require('../../models')
const client = require('../../../config/coin')

let controller = {
    index:async(req,res,next)=>{
        authuser = res.locals.user
        const transaction = await Transaction.find({userId: authuser._id });
        var total=0;
        transaction.forEach((tra) =>{
            total = (parseInt(total) + parseInt(tra.amount))
        })
        // console.log(transaction)
        res.render('pages/transaction', {title:'Transactions', trans:transaction, total:total})
    },

    showDeposit:(req,res,next)=>{
        res.render('pages/deposit/index', {title:'Deposit'})
    },

    showWithdraw:(req,res,next)=>{
        res.render('pages/withdraw/index', {title:'Withdraw'})
    },

    postDeposit:async(req,res, next)=>{
        const {amount, currency, wallet} = req.body
        // res.send(req.body)
        options = {
            currency1:currency,
            currency2:wallet,
            amount:amount,
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
                amount:req.body.amount
            }).catch((err)=>{console.log(err)})
            // console.log(response)
            res.render('pages/deposit/pay', {title:'Send Payment', response})
        }).catch((err)=>{console.log(err.message, 'error'), res.send(err.message)})
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