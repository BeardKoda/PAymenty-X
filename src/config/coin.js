const Coinpayments = require("coinpayments");
const { COIN_KEY, COIN_SECRET } = require("./app")
options ={
    key:COIN_KEY,
    secret:COIN_SECRET,
}
const client = new Coinpayments(options);
module.exports = client