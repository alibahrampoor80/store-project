const {default: mongoose} = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {type: String,},
    last_name: {type: String,},
    username: {type: String, lowercase: true},
    phone: {type: String,},
    email: {type: String, lowercase: true},
    password: {type: String,},
    otp: {
        type: Object, default: {
            code: 0,
            expire: 0
        }
    },
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    brithDay: {type: String},
    role: {type: [String], default: ['USER']}
})


module.exports = {
    userModel: mongoose.model("user", userSchema)
}