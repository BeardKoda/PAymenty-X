const mongoose = require('mongoose')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');


const schema = require('../schema/exchange');

schema.pre('save', function(next){
    var exchange = this
    if(exchange.isModified('amount')){
        encrptyedA = cryptr.encrypt(exchange.amount)
        exchange.amount = encrptyedA
        next()
    }else{
        next()
    }
})
schema.post('find', function(result){
    result.forEach((wal)=>{
        decryptedA = cryptr.decrypt(wal.amount)
        wal.amount = decryptedA
        // console.log(wal.amount)
    })
})

const exchange = mongoose.model('exchange', schema)
module.exports = exchange
