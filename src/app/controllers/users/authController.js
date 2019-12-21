const User = require('../../models/user')

let controller = {
    loginForm :(req, res, next) => {
        res.render('auth/login', { title: 'Express' });
    },
    registerForm :(req, res, next) => {
        res.render('auth/register', { title: 'Express' });
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
                    user.lastLoggin = Date.now()
                    if(user.save()){
                        req.session.userId = user._id
                        // console.log(req.session.user.email)
                        res.redirect('/user')
                }
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
                            res.redirect('login')
                        })
                }else{
                    console.log('user exists')
                    req.flash('error', 'User Already Exists Login!')
                    res.redirect('login')
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
                    console.log('loggedOut')
                    return res.redirect('login');
                }
            });
      }
    }

}
module.exports = controller