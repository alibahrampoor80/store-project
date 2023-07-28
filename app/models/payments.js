const {default: mongoose} = require('mongoose')

const paymentSchema = new mongoose.Schema({})


module.exports = {
    paymentModel: mongoose.model("payment", paymentSchema)
}