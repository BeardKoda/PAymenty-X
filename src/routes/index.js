const appRoute = (app)=>{
    app.get('/', (req, res)=>{
        console.log(app.mountpath)
        // res.send('Landing Page')÷
        res.render('front/land')
    })
    app.get('**', (req,res,next)=>{
        res.render('front/error/404')
    })
    
    // Handle 500
    app.use(function(error, req, res, next) {
        res.status(500);
        res.render('error/500', {title:'500: Internal Server Error', error: error});
    });
}

module.exports = appRoute;