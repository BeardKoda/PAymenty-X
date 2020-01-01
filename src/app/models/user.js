const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT } = require('../../config/app')
const {Wallet, Udata, Coin} = require('./index')
var crypto = require("crypto");

schema = require('../schema/user')

schema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = 'Email doesn\'t exists'
          return callback(err);
        }else if(!user.isVerified){
          var err = "Account not Verified"
          return callback(err)
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

schema.post('save', async(result)=>{
  // console.log(result)
  authuser = result
  
  Udata.findOne({_uid:authuser._id}).then((data)=>{
    // console.log(data)
    if(data === null){
      Udata.create({
        _uid:authuser._id
      })
    }
    Coin.find({isDeleted:false}).then((currency)=>{
      if(currency.length > 0){
        currency.forEach((cur)=>{
          Wallet.findOne({userId:authuser._id,CSF:cur.tag}).then((response)=>{
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
                user.token= crypto.randomBytes(45).toString('hex')
                next()
            })
        } )
    }else{
        next()
    }
})
schema.statics.verify = (token, callback) =>{
  User.findOne({ token: token})
  .exec((err, user)=>{
    if(err){
      return callback(err)
    }else if(!user){
      var err = "Invalid token"
      return callback(err)
    }
    if(user.token ===token){
      user.token=null
      user.isVerified=true
      user.save()
      return callback(null, user)
    }else{
      err = "Non token/ invalid token"
      return callback(err)
    }
  })
}

schema.statics.passwordChange = (id, oldPass, newPass, callback) => {
  User.findOne({ _id: id}).exec((err, user)=>{
    if(err){
      return callback(err)
    }else if (!user) {
      var err = 'User not found.'
      return callback(err);
    }else{
      bcrypt.compare(oldPass, user.password, function (err, result) {
        if (result === true) {
          bcrypt.genSalt(SALT, (err, salt)=>{
            if (err) return next(err)
            bcrypt.hash(newPass, salt, (err, hash)=>{
                if(err)return next(err)
                user.password=hash
                user.save()
                return callback(null, user);
            })
          })
        } else {
          var err ='Wrong Old Password.'
          return callback(err);
        }
      })
    }
  })
}


const User = mongoose.model('User', schema)
module.exports = User 
