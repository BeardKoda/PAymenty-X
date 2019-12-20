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
        trim: true
    },
    currency:{
        type:String,
        required: true,
        trim: true
    },
    CSF:{
        type:String,
        required: true,
        trim: true
    },
    amount:{
        type:String,
        required:true,
    }
},
{timestamps: true})
module.exports = schema