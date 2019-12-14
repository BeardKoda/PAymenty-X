let config = [
    production = {
        MONGO_USERNAME :'exchange',
        MONGO_PASSWORD :'7KPxKdn9BCZITwM2',
        MONGO_HOSTNAME :'exchange-aro9d.gcp.mongodb.net',
        MONGO_PORT :'27017',
        MONGO_DB :'test'
    },
    development = {
        MONGO_USERNAME :'beardkoda',
        MONGO_PASSWORD : '',
        MONGO_HOSTNAME : 'localhost',
        MONGO_PORT : '27017',
        MONGO_DB : 'Paymentx'
    }
]

module.exports = config