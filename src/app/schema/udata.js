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
    company:{
        type:String,
        default:null,
    },
    address:{
        type:String,
        default:null,
    },
    c_description:{
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
    type:{
        type:String,
        default:"Business"
    },
    pics:{
        type:String,
        default:"user.png"
    }
},
{timestamps: true})
module.exports = schema