const path = require('path')
const AuthController = require('../app/controllers/admin/authController')
const DashboardController = require('../app/controllers/admin/dashboardController')
const UserController = require('../app/controllers/admin/userController')
const AdminController = require('../app/controllers/admin/adminController')
const authmiddleware = require('../app/middleware/admin/auth')

const adminRoute = (admin)=>{
    
    admin.set( 'view engine', 'ejs' );
    admin.set('views', path.join(__dirname, '../views/admin'));

    admin.get('/login', AuthController.loginForm)
    admin.post('/login', AuthController.login)

    admin.get('/', authmiddleware, DashboardController.index);
    admin.get('/admins', authmiddleware, AdminController.index)
    admin.get('/users', authmiddleware, UserController.index)
    admin.get('/loggedIn', authmiddleware, (req, res)=>{
        console.log(admin.mountpath)
        res.send('Admin Page')
    })
}

module.exports = adminRoute;