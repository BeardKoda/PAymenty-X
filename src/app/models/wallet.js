const mongoose = require('mongoose')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secret');
 
const { SALT } = require('../../config/app')
// let SALT = 10

const schema = require('../schema/wallet');

schema.pre('save', function(next){
    var wallet = this
    if(wallet.isModified('amount')){
        encrptyedA = cryptr.encrypt(wallet.amount)
        wallet.amount = encrptyedA
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

const wallet = mongoose.model('wallet', schema)
module.exports = wallet 
