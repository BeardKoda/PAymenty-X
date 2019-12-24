const mongoose = require('mongoose')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
const axios = require('axios')
 
const { SALT } = require('../../config/app')
// let SALT = 10

const schema = require('../schema/coin');

schema.pre('save', function(next){
    var wallet = this
    // value = wallet.CSF !== 'LTCT'? wallet.currency.toLowerCase():'bitcoin'
    // axios.get('https://api.coingecko.com/api/v3/coins/'+value).then((rate)=>{
    //     wallet.USDamount = rate.data.market_data.current_price.usd
        // if(wallet.isModified('USDamount')){
        //     encrptyedA = cryptr.encrypt(wallet.USDamount)
        //     wallet.amount = encrptyedA
        //     next()
        // }else{
            next()
        // }
    // })
})

schema.post('init', function(wal){
    // result.forEach((wal)=>{
        // decryptedA = cryptr.decrypt(wal.USDamount)
        // wal.USDamount = decryptedA
        // console.log(wal.amount, "hrre")
    // })
})

const coin = mongoose.model('coin', schema)
module.exports =coin 
