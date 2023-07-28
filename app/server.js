const express = require('express')
const {default: mongoose} = require('mongoose')
const path = require("path");
const http = require('http')
const {allRoutes} = require("./router/router");
const morgan = require('morgan')
const createError = require('http-errors')

module.exports = class Application {
    #app = express()
    #DB_URL
    #PORT

    constructor(PORT, DB_URL) {
        this.#PORT = PORT
        this.#DB_URL = DB_URL
        this.configApplication()
        this.connectToMongoDB()
        this.createServer()
        this.createRoutes()
        this.errorHanding()
    }

    configApplication() {
        this.#app.use(morgan('dev'))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname, '..', 'public')))
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server is running port http://localhost:${this.#PORT}`)

        })
    }

    connectToMongoDB() {
        mongoose.connect(this.#DB_URL).then(() => {
            console.log('connected to mongodb')
        }).catch(err => {
            console.log('err connected')
        })
        process.on("SIGINT", async () => {
            await mongoose.connection.close()
            console.log("disconnected mongodb")
            process.exit(0)
        })
    }

    createRoutes() {
        this.#app.use(allRoutes)
    }

    errorHanding() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        })
        this.#app.use((err, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = err.status || serverError.status
            const message = err.message || serverError.message
            return res.status(statusCode).json({
                // data: null,
                errors: {
                    statusCode,
                    message
                }
            })
        })
    }


}