const Application = require('./app/server')
const dotenv = require('dotenv')
dotenv.config()

new Application(5000, process.env.MONGO_URL)