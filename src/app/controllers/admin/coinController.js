// const { User } = require('../../models')
const {Coin} = require('../../models/')
const axios = require('axios')

const getCoins = async() =>{
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    return rate.data
}
const getCoin = async(id) =>{
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+id+'?localization=false&tickers=false&community_data=false&sparkline=false')
    return rate.data
    // return rate.data.market_data.current_price.usd
}
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
    add:async(req,res,next)=>{
        coins =await getCoins();
        // console.log(coins)
        let response ={
            title:'Add Coins',
            coins
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
    store:async(req,res,next)=>{
        const {name} = req.body
        cvalue =await getCoin(name)
        console.log(name, cvalue)
        Coin.findOne({name:name}, (err,result)=>{
            if(result === null){
                Coin.create({
                    name:cvalue.name,
                    tag:cvalue.symbol,
                    amount:cvalue.market_data.current_price.usd
                }, (err, response)=>{
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