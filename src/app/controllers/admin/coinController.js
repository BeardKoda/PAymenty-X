// const { User } = require('../../models')
const {Coin} = require('../../models/')

let controller = {
    index :async(req, res, next) => {
        var coins = await Coin.find({isDeleted:false})
        active = (await Coin.find({active:true})).length, 
        deleted=(await Coin.find({isDeleted:true})).length,
        suspended=(await Coin.find({active:false})).length
        let response ={
            title:'All Coins',
            coins, active, suspended, deleted 
        }
        res.render('pages/coin/index', response);
    },
    add:(req,res,next)=>{
        let response ={
            title:'Add Coins'
        }
        res.render('pages/coin/add', response)
    },
    edit:async(req,res,next)=>{
        const {id} = req.params
        var coin = await Coin.findOne({_id:id})
        let response ={
            title:'Edit Coins',
            coin
        }
        console.log(req.body)
        res.render('pages/coin/edit', response)
    },
    store:(req,res,next)=>{
        const {name,tag,amount} = req.body
        console.log(req.body)
        Coin.findOne({name:name}, (err,result)=>{
            console.log(err, result)
            if(result === null){
                Coin.create(req.body, (err, response)=>{
                    console.log(err, response)
                    if(err){
                        req.flash('error', 'An Error Occurred')
                        res.redirect('/'+res.locals.url+'/coins')
                    }
                    req.flash('success', 'Coin successfully added')
                    res.redirect('/'+res.locals.url+'/coins')
                })
            }else{
                req.flash('error', 'Coin already Exists')
                res.redirect('/'+res.locals.url+'/coins')
            }
        })
    },
    update:async(req,res,next)=>{
        const { id } = req.params
        coin = await Coin.findOne({_id:id})
        // coin.name = req.body.name
        // coin.tag = req.body.tag
        coin.amount = req.body.amount
        await coin.save()
            // console.log(coin)
            req.flash('success', 'Sucessfully Saved')
            res.redirect('/'+res.locals.url+'/coins')
        
    },
    toggle:async(req,res,next)=>{
        const { id } = req.params
        coin = await Coin.findOne({_id:id})
        coin.active= !coin.active
        await coin.save()
        req.flash('success', 'Sucessfully Updated Status')
        res.redirect('/'+res.locals.url+'/coins')
    },
    delete:async(req,res,next)=>{
        const { id } = req.params
        coin = await Coin.findOne({_id:id})
        coin.delete= true
        await coin.save()
        req.flash('success', 'Sucessfully deleted Coin')
        res.redirect('/'+res.locals.url+'/coins')
    }
}
module.exports = controller