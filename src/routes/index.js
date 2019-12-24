const appRoute = (app)=>{
    app.get('/', (req, res)=>{
        console.log(app.mountpath)
        // res.send('Landing Page')÷
        res.render('front/land')
    })
}

module.exports = appRoute;