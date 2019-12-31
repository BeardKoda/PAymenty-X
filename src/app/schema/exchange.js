const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    userId:{
        type:String,
        required: true,
        trim: true
    },
    type:{
        type:String,
        required: true,
        enum:['buy', 'sell'],
        trim: true
    },
    currencyTo:{
        type:String,
        required: true,
        trim: true
    },
    currencyFrom:{
        type:String,
        required: true,
        trim: true
    },
    status:{
        type:String,
        required: true,
        enum:['Awaiting', 'Pending', 'Processing', 'Paid'],
        trim: true
    },
    data:{
        type:String,
    },
    amount:{
        type:String,
        required:true
    },
    amountUSD:{
        type:String,
        required:true
    },
},
{timestamps: true})
module.exports = schema