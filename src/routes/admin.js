const cookieParser = require('cookie-parser');
const session = require('express-session')
const { NODE_ENV, ADMIN_SESS_NAME, ADMIN_SESS_LIFETIME, ADMIN_SESS_SECRET } = require('../config/app')

const IN_PROD = NODE_ENV === 'production'

const path = require('path')
const { AdminController, AuthController, UserController, DashboardController, TransactionController} = require('../app/controllers/admin')
const {auth, unauth,mid} = require('../app/middleware/admin')

// GII database
var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('../mongo_express_config')

// routes
const adminRoute = (admin)=>{
    admin.use(session({
        name:ADMIN_SESS_NAME,
        resave:false,
        saveUninitialized:false,
        secret:ADMIN_SESS_SECRET,
        cookie:{
            maxAge:parseInt(ADMIN_SESS_LIFETIME),
            sameSite:true,
            secure:IN_PROD
        }
    }))
    admin.use(mid)
    admin.set( 'view engine', 'ejs' );
    admin.set('views', path.join(__dirname, '../views/admin'));

    admin.get('/login', unauth, AuthController.loginForm)
    admin.post('/login', unauth, AuthController.login)
    admin.post('/register', AuthController.register)
    admin.use('/mongo_express', mongo_express(mongo_express_config))

    admin.get('/', auth, DashboardController.index);
    admin.get('/admins', auth, AdminController.index)
    admin.get('/users', auth, UserController.index)
    admin.get('/rates/refresh', auth, TransactionController.getRates)
    admin.get('/transactions', auth, TransactionController.index)
    admin.get('/transaction/:id', auth, TransactionController.show)
    admin.get('/transaction/verify/:id', auth, TransactionController.getTX)
    admin.get('/exchange', auth, TransactionController.index)
    admin.get('**', auth, (req,res,next)=>{
        res.render('error/404')
    })
}

module.exports = adminRoute;