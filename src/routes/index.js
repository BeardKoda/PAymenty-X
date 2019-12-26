const appRoute = (app)=>{
    app.get('/', (req, res)=>{
        console.log(app.mountpath)
        // res.send('Landing Page')÷
        res.render('front/land')
    })
    app.get('**', (req,res,next)=>{
        res.render('front/error/404')
    })
    // if (app.settings.env === 'production') {
        app.error(function(err, req, res) {
            res.render('500.ejs', {
               status: 500,
               locals: {
                  error: error
               }
            });
        });
    //  }
}

module.exports = appRoute;