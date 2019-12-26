const appRoute = (app)=>{
    app.get('/', (req, res)=>{
        console.log(app.mountpath)
        // res.send('Landing Page')÷
        res.render('front/land')
    })
    app.get('**', (req,res,next)=>{
        res.render('front/error/404')
    })
}

module.exports = appRoute;