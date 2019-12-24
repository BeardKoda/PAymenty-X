const express = require('express')
const session = require('express-session')
const bodyParser = require("body-parser");
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express()
const admin = express()
const user = express()
const ejs = require('ejs')
const dotenv = require('dotenv');
dotenv.config();
const { PORT, NODE_ENV, SESS_NAME, SESS_LIFETIME, SESS_SECRET, ADMIN_URL, USER_URL, APP_NAME } = require('./config/app')
const appRoute = require('./routes/index.js')
const userRoute = require('./routes/user.js')
const adminRoute = require('./routes/admin.js')
const db = require('./database/db')
var flash = require('connect-flash');
var helpers = require('handlebars-helpers')();
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);



const IN_PROD = NODE_ENV === 'production'

// load database
// app.use(db)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(SESS_NAME));
app.use(session({
    name:SESS_NAME,
    resave:false,
    saveUninitialized:false,
    secret:SESS_SECRET,
    store:new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:{
        maxAge:parseInt(SESS_LIFETIME),
        sameSite:true,
        secure:IN_PROD
    }
}))
app.use(flash());
app.use(function(req, res, next){
  res.locals.site_title = APP_NAME
    // console.log(req.flash()['success'])
    // if there's a flash message in the session request, make it available in the response, then delete it
    //   res.locals.sessionFlash = req.session.sessionFlash;
      res.locals.message = req.flash();
    //   delete req.session.sessionFlash;
      next();
});
// console.log(USER_URL, ADMIN_URL, PORT)
app.set('site_title', APP_NAME)
app.set('view engine', 'ejs')
let ejsOptions = {delimiter: '%'};
app.engine('ejs', (path, data, cb) => {
  ejs.renderFile(path, data, ejsOptions, cb);
});
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(`/${ADMIN_URL}`, admin)
app.use(`/${USER_URL}`, user)

appRoute(app)
userRoute(user)
adminRoute(admin)

var server = app.listen(PORT, function () {
    console.log("app running on port.", server.address().port);
});