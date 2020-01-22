
const FrontController = require('../app/controllers/frontController')
const appRoute = (app)=>{
    app.get('/', FrontController.index)
    app.get('/privacy-policy', (req, res)=>{
        res.render('front/privacy', {title:"Privacy Policy"})
    })
    app.get('/about', (req, res)=>{
        res.render('front/about', {title:"About Us"})
    })
    app.get('/services', (req, res)=>{
        res.render('front/service', {title:"Our Service"})
    })
    app.get('/market_data', (req, res)=>{
        res.render('front/market', {title:"Market Data"})
    })
    app.get('/buy_sell', (req, res)=>{
        res.render('front/buy', {title:"Buy and Sell"})
    })
    app.get('/exchange', (req, res)=>{
        res.render('front/exchange', {title:"Buy and Sell"})
    })
    app.get('/terms-condition', (req, res)=>{
        res.render('front/terms', {title:"Terms and Conditions"})
    })
    app.get('/contact', (req, res)=>{
        res.render('front/contact', {title:"Contact Us"})
    })

    // handle 404
    app.get('**', (req,res,next)=>{
        res.locals.title = 404
        res.render('front/error/404')
    })
    
    // Handle 500
    // app.use(function(error, req, res, next) {
    //     res.locals.title = 500
    //     res.status(500);
    //     res.render('error/500', {title:'500: Internal Server Error', error: error});
    // });
}

module.exports = appRoute;