const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
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
    }
},
{timestamps: true})
module.exports = schema