const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT } = require('../../config/app')
const {Wallet} = require('./index')
const curency = require('../../config/currency')

schema = require('../schema/user')

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

schema.post('save', (result)=>{
  authuser = result
  // console.log(authuser)
  curency.forEach((cur)=>{
    Wallet.findOne({userId:authuser._id}).then((response)=>{
      if(response===null){
        Wallet.create({
          userId:authuser._id,
          type:"crypto",
          currency:cur.name,
          CSF:cur.tag,
          amount:"0"
        })
      }
    })
  })
})

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
