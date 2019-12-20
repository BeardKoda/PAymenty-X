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
                    // console.log(res)
                    User.create(req.body)
                        .then((result)=>{
                            console.log(result)
                            req.session.success = "Account Successfully created Login"
                            res.redirect('login')
                        }).catch((err)=>{
                            console.log(err)
                            req.flash('error', err)
                            // res.redirect('login')
                            res.send('account created')
                        })
                }else{
                    console.log('user exists')
                    req.flash('error', 'User Already Exists Login!')
                    // res.redirect('login')
                    res.send("error accout exists")
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
                    console.log('loggedOut')
                    return res.redirect('login');
                }
            });
      }
    }
}
module.exports = controller