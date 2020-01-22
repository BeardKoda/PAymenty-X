const axios = require('axios')
const getRate = async(value, type) =>{
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
    value = rate.data.market_data
    data = {
        price:value.current_price.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        volume:value.total_volume.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        update:value.price_change_percentage_24h.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        change:value.price_change_percentage_1h_in_currency.usd.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
    return data
       
}
let controller = {
    index:async(req,res,next)=>{
        coins = [
            {name:"Bitcoin", data:await getRate('bitcoin')},
            {name:"Ethereum", data:await getRate('ethereum')},
            {name:"Ripple", data:await getRate('ripple')},
            {name:"Bitcoin Cash", data:await getRate('bitcoin-cash')},
            {name:"Bitcoin", data:await getRate('bitcoin')},
            {name:"Ethereum", data:await getRate('ethereum')},
            {name:"Ripple", data:await getRate('ripple')},
            {name:"Bitcoin Cash", data:await getRate('bitcoin-cash')},
        ]
        response = {
            title:"home",
            coins
        }
        // console.log("here")
        res.render('front/land', response)
    }
}
module.exports = controller