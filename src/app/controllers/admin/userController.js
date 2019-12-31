// const { User } = require('../../models')
const { Wallet, Exchange } = require('../../models/')
const User = require('../../models/user')
const axios = require('axios')
const bank = require('../../../config/bank')

const getRate = async(value) =>{
    // console.log(value)
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
       return rate.data.market_data.current_price.usd
}

const buy= async(data)=>{
    const {Bcurrency, Pay, amountBTC, id } = data
    if(Bcurrency && Pay && amountBTC){
        let result = await Exchange.create({
            userId:id,
            type:"buy",
            currencyTo:Bcurrency,
            currencyFrom:Bcurrency,
            status:"Awaiting",
            data:JSON.stringify(bank),
            amount:amountBTC,
            amountUSD:Pay
        })
        if(result){
            // console.log('ture')
            return true
        }
    }else{
        // console.log('flfl')
        return false
    }
}

let controller = {
    index :async(req, res, next) => {
        const trans = await User.find({ });
        const active =(await User.find({active:true})).length, deleted=(await User.find({isDeleted:true})).length, suspended=(await User.find({active:false})).length
        let response ={
            title:'All Customers',
            trans, active, suspended, deleted 
        }
        res.render('pages/user/index', response);
    },
    addFund:async(req,res,next)=>{
        const { id } = req.params
        User.findOne({_id:id}).then(async(user)=>{
            if(user){
                response = {
                    title:'Edit', 
                    user:user,
                    wallets:await Wallet.find({userId:id})
                }
                res.render('pages/user/add',response)
            }
        })
    },
    saveFund:async(req,res,next)=>{
        const { wallet, id, amount } = req.body
        // console.log(req.body)
        User.findById(id).then((user)=>{
            // console.log(parseInt(amount))
            Wallet.findOne({userId:id, CSF:wallet}).then(async(wal)=>{
                value = wal.CSF !== 'LTCT'? wal.currency.toLowerCase():'bitcoin'
                rate = await getRate(value)
                wava = rate*parseInt(amount)
                data = {
                    Bcurrency:wallet,
                    id:id, amountBTC:parseInt(amount), Pay:wava
                }
                // console.log(rate, data)
                saved = await buy(data)
                if(saved){
                    wal.amount = parseFloat(wal.amount) + parseFloat(amount)
                    if(wal.save()){
                        req.flash('success', "succesfully added")
                        res.redirect('/'+res.locals.url+'/users')
                    }
                }
            }).catch(err=>{console.log(err)})
        })
    },
}
module.exports = controller