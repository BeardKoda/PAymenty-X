const cookieParser = require('cookie-parser');
const session = require('express-session')
const { NODE_ENV, USER_SESS_NAME, USER_SESS_LIFETIME, USER_SESS_SECRET } = require('../config/app')

const IN_PROD = NODE_ENV === 'production'

const path = require('path')

const auth = require('../app/middleware/user/auth')
const unauth = require('../app/middleware/user/unauth')
const AuthController = require('../app/controllers/users/authController')
const DashboardController = require('../app/controllers/users/dashboardController')
const ejs = require( 'ejs' )

const userRoute = (user)=>{
    user.use(session({
        name:USER_SESS_NAME,
        resave:false,
        saveUninitialized:false,
        secret:USER_SESS_SECRET,
        cookie:{
            maxAge:parseInt(USER_SESS_LIFETIME),
            sameSite:true,
            secure:IN_PROD
        }
    }))
    // user.engine( 'hbs');
    
    user.set( 'view engine', 'ejs' );
    // hbs.registerPartials(path.join(__dirname, '../views/user/partials'))
    user.set('views', path.join(__dirname, '../views/user'));

    // Authentication Routes
    user.get('/login', unauth, AuthController.loginForm)
    user.get('/register', unauth, AuthController.registerForm)
    user.post('/login', unauth, AuthController.login)
    user.post('/register', unauth, AuthController.register)

    // AUTHENTICATED ROUTES
    user.get('/', auth, DashboardController.index);
    user.get('/blank', auth, DashboardController.blank);
    user.get('/logout', auth, AuthController.logout)

}

module.exports = userRoute;