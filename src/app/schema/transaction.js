const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    userId:{
        type:String,
        required: true,
        trim: true
    },
    TxId:{
        type:String,
    },
    type:{
        type:String,
        required: true,
        trim: true
    },
    currencyFrom:{
        type:String,
        required: true,
        trim: true
    },
    currencyTo:{
        type:String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required: true,
        trim: true
    },
    status:{
        type:String,
        required: true,
        trim: true
    },
    data:{
        type:String,
    },
    amount:{
        type:String,
        required:true
    }
},
{timestamps: true})
module.exports = schema