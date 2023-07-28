const {default: mongoose} = require('mongoose')

const slideSchema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String},
    type: {type: String, default: "main"},
})

module.exports = {
    sliderModel: mongoose.model("slider", slideSchema)
}