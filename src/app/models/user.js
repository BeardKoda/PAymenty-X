const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let SALT = 10

const { Schema } = mongoose;

const schema = new Schema({
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
    }
})

schema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = 'User not found.'
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            var err ='Invalid Password.'
            return callback(err);
          }
        })
      });
}

schema.pre('save', function(next){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(SALT, (err, salt)=>{
            if (err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err)return next(err)
                user.password=hash
                next()
            })
        } )
    }else{
        next()
    }
})

const User = mongoose.model('User', schema)
module.exports = User 
