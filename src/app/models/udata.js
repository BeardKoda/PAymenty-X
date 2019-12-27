const mongoose = require('mongoose')

schema = require('../schema/udata')

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
const Udata = mongoose.model('Udata', schema)
module.exports = Udata
