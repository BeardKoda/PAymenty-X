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
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps: true})
module.exports = UserSchema