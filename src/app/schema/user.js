const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: 1,
        trim: true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    active:{
        type:Boolean,
        default:true
    },
    isVerified: {
      type:Boolean,
      default:false
    },
    token:{
        type:String
    },
    tokenAF:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    lastLoggin:{
        type:Date,
        default:Date.now()
    }
},
{timestamps: true})
module.exports = UserSchema