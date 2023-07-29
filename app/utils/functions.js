const jwt = require('jsonwebtoken')
const createError = require("http-errors");
const {userModel} = require("../models/users");

function numberRandomGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findById( userId)
        const payload = {
            mobile: user.mobile,
            userId: user._id,
        }

        const secret = process.env.SECRET
        const options = {
            expiresIn: "1h"
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })
}

module.exports = {
    numberRandomGenerator,
    signAccessToken
}
