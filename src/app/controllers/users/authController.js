const { validationResult } = require('express-validator');
const User = require('../../models/user')
var eventer=require('../../events/emitter')

let controller = {
    loginForm :(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
    },
    registerForm :(req, res, next) => {
        res.render('auth/register', { title: 'Express' });
    },

    login:(req, res, next) => {
        try {
           const errors = validationResult(req); 
           // Finds the validation errors in this request and wraps them in an object with handy functions
           if (!errors.isEmpty()) {
             res.status(422).json({ errors: errors.array() });
             return;
           }
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
                        user.lastLoggin = Date.now()
                        if(user.save()){
                            req.flash('sucess', 'loggedIn')
                            req.session.userId = user._id
                            res.redirect('/user')
                    }
                    }
                })
            }else{
                var err = new Error('All fields are required')
                err.status = 400                    
                res.redirect('login')
            }
        }catch(error){
            next(error)
        }
    },

    // Register new User
    register:(req, res, next) => {
        try {
           const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
           if (!errors.isEmpty()) {
             res.status(422).json({ errors: errors.array() });
             return;
           }
            const {username, email, password} = req.body
            
            if(username && email && password){
                User.findOne({email:email}).then((response)=>{
                    if(response===null){
                        // console.log(res)
                        User.create(req.body)
                            .then((result)=>{
                                // console.log(result)
                                eventer.emit('sendMail:Register', result)
                                req.flash('success', "Account Created Activate Account")
                                res.redirect('login')
                            }).catch((err)=>{
                                // console.log(err)
                                req.flash('error', "Account Created")
                                res.redirect('register')
                            })
                    }else{
                        // console.log('user exists')
                        req.flash('error', 'User Already Exists Login!')
                        res.redirect('login')
                    }
                })
            }
        }catch(err){
            next(err)
        }
    },

    verify:(req,res,next)=>{
        const {token}=req.params
        try{
            User.verify(token, (err, user)=>{
                if(err){
                    req.flash('error', err)
                    res.redirect('/user/login')
                }
                if(user){
                    req.flash('success', 'Verified')
                    res.redirect('/user/login')
                }
            })
        }catch(err){
            console.log(err)
        }
    },
    
    passUpdate:(req,res,next)=>{
        id =res.locals.user._id
        var {oldPass, newPass, cnewPass} = req.body
        if(cnewPass !== newPass){
            req.flash('error', "Password do not match")
            res.redirect('/'+res.locals.url+'/settings')
        }else{
            User.passwordChange(id, oldPass,newPass, (err, result)=>{
                //  return view
                if(err){
                    req.flash('error', err)
                    res.redirect('/'+res.locals.url+'/settings')
                }else{
                    req.flash('success', "Password Successfully Updated")
                    res.redirect('/'+res.locals.url+'/settings')
                }
            })
        }
    },

    // Logout User
    logout:(req, res, next) => {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    // console.log('loggedOut')
                    return res.redirect('login');
                }
            });
      }
    }

}
module.exports = controller