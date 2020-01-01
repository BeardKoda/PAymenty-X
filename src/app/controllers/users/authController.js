const { validationResult } = require('express-validator');
const User = require('../../models/user')
var eventer=require('../../events/emitter')

let controller = {
    loginForm :(req, res, next) => {
        res.render('auth/login', { title: 'Login' });
    },
    registerForm :(req, res, next) => {
        res.render('auth/register', { title: 'Register' });
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
                        res.redirect('/'+res.locals.url+'/authenticate/2FA/'+user._id)
                        // user.lastLoggin = Date.now()
                        // if(user.save()){
                        //     req.flash('sucess', 'loggedIn')
                        //     req.session.userId = user._id
                        //     res.redirect('/user')
                        // }
                    }
                })
            }else{
                var err = new Error('All fields are required')
                err.status = 400          
                req.flash("error", err)       
                res.redirect('/'+res.locals.url+'/login')
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
                                req.flash('success', "Account Created, Please Check your Mail to activate Account")
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
                    req.flash('success', 'Account is now verified')
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
    },

    // resend mail
    mailForm:(req,res,next)=>{
        res.render('auth/resend', { title: 'Resend Mail' });
    },

    mailSend:(req,res,next)=>{
        const { email } = req.body
        // console.log("here")
        User.findOne({email:email}).then((user)=>{
            if(!user.isVerified){
                user.isVerified = false
                user.token= crypto.randomBytes(45).toString('hex')
                if(user.save()){
                    eventer.emit('sendMail:Register', result)
                    req.flash('success', "Activation Mail Sent")
                    res.redirect('login')
                }
            }
            req.flash('success', "Account Activated Login")
            res.redirect('login')

        })
    },

    show2FA:(req,res,next)=>{
        id = req.params.id
        console.log(id)
        if(id){
            User.findOne({_id:id}).then((user)=>{
                if(user){
                    User.AF2gen(user.email,(err, user)=>{
                        if(err){
                            req.flash('error', err)
                            res.redirect('login')
                        }
                        if(user){
                            eventer.emit('sendMail:Login', user)
                            res.render('auth/token', {title:'2FA Token', email:user.email})
                        }
                    })
                }
            })
        }else{
            res.redirect('login')
        }
    },

    FA2:async(req, res, next)=>{
        const { token, email }=req.body
        // console.log(req.body)
        User.AF2(token, email,(err, user)=>{
            if(err){
                // console.log(err)
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
    }   
}
module.exports = controller