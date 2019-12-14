const cookieParser = require('cookie-parser');
const session = require('express-session')
const { NODE_ENV, ADMIN_SESS_NAME, ADMIN_SESS_LIFETIME, ADMIN_SESS_SECRET } = require('../config/app')

const IN_PROD = NODE_ENV === 'production'

const path = require('path')

const AuthController = require('../app/controllers/admin/authController')
const DashboardController = require('../app/controllers/admin/dashboardController')
const UserController = require('../app/controllers/admin/userController')
const AdminController = require('../app/controllers/admin/adminController')
const auth = require('../app/middleware/admin/auth')
const unauth = require('../app/middleware/admin/unauth')

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
    
    admin.set( 'view engine', 'ejs' );
    admin.set('views', path.join(__dirname, '../views/admin'));

    admin.get('/login', unauth, AuthController.loginForm)
    admin.post('/login', unauth, AuthController.login)

    admin.get('/', auth, DashboardController.index);
    admin.get('/admins', auth, AdminController.index)
    admin.get('/users', auth, UserController.index)
    admin.get('/loggedIn', auth, (req, res)=>{
        console.log(admin.mountpath)
        res.send('Admin Page')
    })
}

module.exports = adminRoute;