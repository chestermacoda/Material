require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET // De preferência, use env vars
}