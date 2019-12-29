const appRoute = (app)=>{
    app.get('/', (req, res)=>{
        console.log(app.mountpath)
        res.render('front/land', {title:"Home"})
    })
    app.get('/privacy-policy', (req, res)=>{
        console.log(app.mountpath)
        res.render('front/privacy', {title:"Privacy Policy"})
    })
    app.get('/terms-condition', (req, res)=>{

        res.render('front/terms', {title:"Terms and Conditions"})
    })
    app.get('/contact', (req, res)=>{
        res.render('front/contact', {title:"Contact"})
    })

    // handle 404
    app.get('**', (req,res,next)=>{
        res.render('front/error/404')
    })
    
    // Handle 500
    // app.use(function(error, req, res, next) {
    //     res.status(500);
    //     res.render('error/500', {title:'500: Internal Server Error', error: error});
    // });
}

module.exports = appRoute;