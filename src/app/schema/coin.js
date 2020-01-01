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
    gid:{
        type:String,
        required:true
    },
    amount:{
        type:String,
    },
    buy:{
        type:Boolean,
        default:true
    },
    sell:{
        type:Boolean,
        default:true
    },
    pay:{
        type:Boolean,
        default:true
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