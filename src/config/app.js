// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    APP_NAME:process.env.APP_NAME,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    SESS_LIFETIME: process.env.SESS_LIFETIME,
    SESS_NAME: process.env.SESS_NAME,
    SESS_SECRET: process.env.SESS_SECRET,

    ADMIN_URL: process.env.ADMIN_URL,
    USER_URL: process.env.USER_URL,
};