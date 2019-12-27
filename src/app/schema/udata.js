const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    _uid:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        default:null,
        trim: true
    },
    lastName:{
        type:String,
        default:null,
        trim: true
    },
    location:{
        type:String,
        default:null,
    },
    telNo:{
        type:String,
        default:null,
    },
    Account_Details:{
        type:String,
        default:null
    },
    pics:{
        type:String,
        default:"user.jpeg"
    }
},
{timestamps: true})
module.exports = schema