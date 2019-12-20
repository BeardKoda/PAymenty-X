const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = require('../schema/admin')

let { SALT } = require('../../config/app')

schema.statics.authenticate = function (email, password, callback) {
  Admin.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = 'Invaild Email.'
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

const Admin= mongoose.model('Admin', schema)
module.exports = Admin
