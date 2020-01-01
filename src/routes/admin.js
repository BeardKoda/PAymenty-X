const cookieParser = require('cookie-parser');
const session = require('express-session')
const { NODE_ENV, ADMIN_SESS_NAME, ADMIN_SESS_LIFETIME, ADMIN_SESS_SECRET } = require('../config/app')

const IN_PROD = NODE_ENV === 'production'

const path = require('path')
const { AdminController, AuthController, UserController, DashboardController, TransactionController, CoinController,ExchangeController } = require('../app/controllers/admin')
const {auth, unauth, Asuper, mid, } = require('../app/middleware/admin')

// GII database
var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('../mongo_express_config')
var flash = require('connect-flash');


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
    admin.use(flash());
    admin.use(mid)
    admin.use(function(req, res, next){
        res.locals.message = req.flash();
        // console.log(res.locals)
        next();
    });
    admin.set( 'view engine', 'ejs' );
    admin.set('views', path.join(__dirname, '../views/admin'));

    // Authentication Routes
    admin.get('/login', unauth, AuthController.loginForm)
    admin.post('/login', unauth, AuthController.login)
    // Registeration Route from API
    admin.post('/register', AuthController.register)
    // DB Routes
    admin.use('/mongo_db', Asuper, mongo_express(mongo_express_config))

    admin.get('/', auth, DashboardController.index);
    admin.get('/admins', auth, AdminController.index)
    // users
    admin.get('/users', auth, UserController.index)
    admin.get('/user/funds/add/:id', auth, UserController.addFund)
    admin.post('/user/funds/add/:id', auth, UserController.saveFund)

    // Rates
    admin.get('/rates/refresh', auth, TransactionController.getRates)
    // Transaction 
    admin.get('/transactions/deposits', auth, TransactionController.index)
    admin.get('/transactions/withdraws', auth, TransactionController.Windex)
    admin.get('/transaction/:id', auth, TransactionController.show)
    admin.get('/transaction/verify/:id', auth, TransactionController.getTX)
    // Exchange 
    admin.get('/exchange/buy', auth, ExchangeController.bindex)
    admin.get('/exchange/sell', auth, ExchangeController.sindex)
    // coin CRUD
    admin.get('/coins', auth,CoinController.index)
    admin.get('/coin/add', auth, CoinController.add)
    admin.post('/coin/add', auth, CoinController.store)
    admin.get('/coin/edit/:id', auth, CoinController.edit)
    admin.post('/coin/edit/:id', auth, CoinController.update)
    admin.post('/coin/delete/:id', auth, CoinController.delete)
    admin.post('/coin/toggle/:id', auth, CoinController.toggle)
    admin.post('/coin/sell/:id', auth, CoinController.toggleS)
    admin.post('/coin/buy/:id', auth, CoinController.toggleB)
    admin.post('/coin/pay/:id', auth, CoinController.toggleP)
    // Setting
    admin.get('/settings', auth, DashboardController.setting)
    admin.get('/logout', auth, AuthController.logout)

    // Axios API routes
    admin.get('/api/dashboard/fetch', auth, DashboardController.getAxioData)

    // handle 404
    admin.get('**', auth, (req,res,next)=>{
        res.render('error/404')
    })
    
    // Handle 500
    admin.use(function(error, req, res, next) {
        console.log(error)
        res.status(500);
        res.render('error/500', {title:'500: Internal Server Error', error: error});
    });
}

module.exports = adminRoute;