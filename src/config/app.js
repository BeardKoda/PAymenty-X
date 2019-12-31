// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    APP_NAME:process.env.APP_NAME,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL:process.env.APP_URL,

    SESS_LIFETIME: process.env.SESS_LIFETIME,
    SESS_NAME: process.env.SESS_NAME,
    SESS_SECRET: process.env.SESS_SECRET,

    ADMIN_URL: process.env.ADMIN_URL,
    USER_URL: process.env.USER_URL,

    ADMIN_SESS_LIFETIME: process.env.ADMIN_SESS_LIFETIME,
    ADMIN_SESS_NAME: process.env.ADMIN_SESS_NAME,
    ADMIN_SESS_SECRET: process.env.ADMIN_SESS_SECRET,

    USER_SESS_LIFETIME: process.env.USER_SESS_LIFETIME,
    USER_SESS_NAME: process.env.USER_SESS_NAME,
    USER_SESS_SECRET: process.env.USER_SESS_SECRET,

    SALT : 10,
    COIN_KEY :process.env.COIN_KEY,
    COIN_SECRET: process.env.COIN_SECRET,
    // Email 
    MAIL: {
        USER : process.env.EMAIL_USER,
        PASS : process.env.EMAIL_PASS,
        HOST : process.env.EMAIL_HOST,
        PORT : process.env.EMAIL_PORT
    }
};