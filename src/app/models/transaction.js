const mongoose = require('mongoose')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
 
const { SALT } = require('../../config/app')
// let SALT = 10

const schema = require('../schema/transaction');

schema.pre('save', function(next){
    var transaction = this
    if(transaction.isModified('amount')){
        encrptyedA = cryptr.encrypt(transaction.amount)
        transaction.amount = encrptyedA
        next()
    }else{
        next()
    }
})
schema.post('init', function(wal){
    // result.forEach((wal)=>{
        decryptedA = cryptr.decrypt(wal.amount)
        wal.amount = decryptedA
        // console.log(wal.amount)
    // })
})

const transaction = mongoose.model('transaction', schema)
module.exports = transaction 
