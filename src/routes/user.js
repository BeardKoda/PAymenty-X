const cookieParser = require('cookie-parser');
const session = require('express-session')
const { NODE_ENV, USER_SESS_NAME, USER_SESS_LIFETIME, USER_SESS_SECRET } = require('../config/app')

const IN_PROD = NODE_ENV === 'production'

const path = require('path')

const { auth, unauth, mid} = require('../app/middleware/user')
const { AuthController, DashboardController, WalletController, TransactionController, ProfileController, ExchangeController } = require('../app/controllers/users')
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
    user.use(mid)
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
    user.get('/buy-sell', auth, ExchangeController.index);
    user.get('/deposit', auth, TransactionController.showDeposit)
    user.post('/deposit/processing', auth, TransactionController.postDeposit)

    user.get('/withdraw', auth, TransactionController.showWithdraw)
    user.post('/withdraw/processing', auth, TransactionController.postWithdraw)
    user.get('/transactions', auth, TransactionController.index)
    user.get('/exchange', auth, ExchangeController.index)
    // user.get('/transactions/all', auth, TransactionController.getAll)
    user.get('/settings', auth, DashboardController.blank);
    user.get('/profile', auth, ProfileController.index);
    user.get('/wallet', auth, WalletController.index)
    user.get('/logout', auth, AuthController.logout)

    user.get('**', auth, (req,res,next)=>{
        res.render('error/404')
    })

}

module.exports = userRoute;