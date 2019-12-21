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
    currency:{
        type:String,
        required: true,
        trim: true
    },
    status:{
        type:String,
        required: true,
        enum:['active', 'complete'],
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