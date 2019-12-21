const User = require('../../models/admin')
const { ADMIN_URL } = require('../../../config/app')

let controller = {
    loginForm :(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
    },

    login:(req, res, next) => {
        const { email, password } = req.body
        if(email && password){
            // console.log('here')
            User.authenticate(email, password, (err, user)=>{
                if(err){
                    console.log(err)
                    req.flash('error', err)
                    res.redirect('login')
                }
                if(user){
                    req.session.adminId = user._id
                    res.redirect(`/${ADMIN_URL}`)
                }
            })
        }else{
            var err = new Error('All fields are required')
            err.status = 400                    
            res.redirect('login')
        }
    },

    // Register new User
    register:(req, res, next) => {
        const {username, email, password} = req.body
        // res.send(req.body)
        if(username && email && password){
            User.findOne({email:email}).then((response)=>{
                if(response===null){
                    User.create(req.body)
                        .then((result)=>{
                            req.session.success = "Account Successfully created Login"
                            res.status(200).json("Successfully Created Account")
                        }).catch((err)=>{
                            req.flash('error', err)
                            res.send('account created')
                        })
                }else{
                    req.flash('error', 'User Already Exists Login!')
                    res.status(200).json("error accout exists")
                }
            })
        }
    },

    // Logout Admin
    logout:(req, res, next) => {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    return res.redirect('login');
                }
            });
      }
    }
}
module.exports = controller