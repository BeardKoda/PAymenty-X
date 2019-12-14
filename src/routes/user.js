const path = require('path')
const auth = require('../app/middleware/user/auth')
const unauth = require('../app/middleware/user/unauth')
const AuthController = require('../app/controllers/users/authController')
const DashboardController = require('../app/controllers/users/dashboardController')
const ejs = require( 'ejs' )

const userRoute = (user)=>{
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