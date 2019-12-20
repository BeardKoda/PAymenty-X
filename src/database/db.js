const mongoose = require('mongoose');
const data = require('./config')

const config = development
// console.log(config)
const MONGO_USERNAME = config.MONGO_USERNAME;
const MONGO_PASSWORD = config.MONGO_PASSWORD;
const MONGO_HOSTNAME = config.MONGO_HOSTNAME;
const MONGO_PORT = config.MONGO_PORT;
const MONGO_DB = config.MONGO_DB;
// console.log(config)
// const url = `mongodb://${MONGO_USERNAME}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?retryWrites=true&w=majority`;
const url = `mongodb://${MONGO_HOSTNAME}/${MONGO_DB}`
// const url = `mongodb+srv://exchange:${MONGO_PASSWORD}@exchange-aro9d.gcp.mongodb.net/test?retryWrites=true&w=majority`

module.exports = mongoose.connect(url, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology:true})
.then(()=>console.log("DB Connected"))
.catch(error=>console.log(error));
// mongodb+srv://exchange:<password>@exchange-aro9d.gcp.mongodb.net/test?retryWrites=true&w=majority
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//     console.log('connected')
// });
