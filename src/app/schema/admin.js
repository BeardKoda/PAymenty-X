const mongoose = require('mongoose')
const { Schema } = mongoose;

const AdminSchema = new Schema({
    username:{
        type:'string',
        required: true,
        trim: true
    },
    email:{
        type:'string',
        required: true,
        unique: 1,
        trim: true
    },
    password:{
        type:'string',
        required:true,
        minLength:6
    },
    active:{
        type:Boolean,
        default:true
    },
    super:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{timestamps: true})

module.exports = AdminSchema