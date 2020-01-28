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
        var err = 'Invalid Credientials'
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
schema.statics.AF2gen = function (email, callback){
  User.findOne({ email: email })
  .exec(function (err, user) {
      token = Math.random().toString(36).substr(2, 5);
      user.tokenAF = token
      if(user.save()){
        console.log("random", token);
        return callback(null, user);
      }
  })
}

schema.statics.AF2 = function (token,email, callback) {
  val = email
  User.findOne({email:val, tokenAF:token}).exec(function (err, user) {
        // console.log(email, val, token,user, err)
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = 'Token Expired'
        return callback(err);
      }else if(!user.isVerified){
        var err = "Account not Verified"
        return callback(err)
      }
      if(user){
          return callback(null, user);
        }
        
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
                gid:cur.gid,
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
      console.log('hello')
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
      console.log(id, oldPass, newPass)
      bcrypt.compare(oldPass, user.password, function (err, result) {
        if (result === true) {
          user.password=newPass
          user.save()
          return callback(null, user);
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
