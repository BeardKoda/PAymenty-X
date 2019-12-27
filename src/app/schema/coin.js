const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    name:{
        type:String,
        required: true,
        unique:1,
        trim: true
    },
    tag:{
        type:String,
        required: true,
        unique:1,
        trim: true
    },
    amount:{
        type:String,
    },
    active:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps: true})
module.exports = schema