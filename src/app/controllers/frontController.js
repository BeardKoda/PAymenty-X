const axios = require('axios')
const getRate = async(value, type) =>{
    rate = await axios.get('https://api.coingecko.com/api/v3/coins/'+value)
    value = rate.data.market_data
    data = {
        price:value.current_price.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        priceEr:value.current_price.eur.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        volume:value.total_volume.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        update:value.price_change_percentage_24h.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        one:value.price_change_percentage_14d.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        seven:value.price_change_percentage_7d.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        mcap:value.market_cap_change_percentage_24h_in_currency.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
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
        rates=[
            {id:'BTC', name:"Bitcoin", data:await getRate('bitcoin'), bg:"#607d8b;"},
            {id:'ETH', name:"Ethereum", data:await getRate('ethereum'), bg:'#0089e0;'},
            {id:'RPP', name:"Ripple", data:await getRate('ripple'), bg:'#27415a;'},
            {id:'BCH', name:"Bitcoin Cash", data:await getRate('bitcoin-cash'),bg:'rgb(0, 188, 212);'},
        ]
        response = {
            title:"home",
            coins,rates
        }
        console.log(coins[0])
        res.render('front/land', response)
    }
}
module.exports = controller