const jwt = require('jsonwebtoken')
const createError = require("http-errors");
const {userModel} = require("../models/users");
const redisClient = require('./init_redis')
const path = require("path");
const fs = require('fs')


function numberRandomGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findById(userId)
        const payload = {
            mobile: user.mobile
        }

        const secret = process.env.ACCESS_TOKEN_SECRET_KEY
        const options = {
            expiresIn: "1000d"
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })
}


function signRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findById(userId)
        const payload = {
            mobile: user.mobile
        }

        const secret = process.env.REFRESH_TOKEN_SECRET_KEY
        const options = {
            expiresIn: "100y"
        }
        jwt.sign(payload, secret, options, async (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سرور"))
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token)
            resolve(token)
        })
    })
}


function verifyRefreshToken(token) {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, {},
            async (err, payload) => {
                if (err) reject(createError.Unauthorized('وارد حساب کاربری خود شوید'))
                const {mobile} = payload || {}
                const user = await userModel.findOne({mobile}, {password: 0, otp: 0, __V: 0})
                if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد!"))

                const refreshToken = await redisClient.get(String(user._id))
                if (token == refreshToken) return resolve(mobile)
                else return reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد!"))

            })
    })

}

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
}

function setFeatures(body) {
    const {colors, width, weight, height, length} = body;
    let feature = {};
    feature.colors = colors;
    if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
        if (!width) feature.width = 0;
        else feature.width = +width;
        if (!height) feature.height = 0;
        else feature.height = +height;
        if (!weight) feature.weight = 0;
        else feature.weight = +weight;
        if (!length) feature.length = 0;
        else feature.length = +length;
    }
    return feature
}

function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
}

function deleteInvalidPropertyInObject(data = {}, blackListField = []) {
    let nullData = ["", " ", "0", 0, null, undefined]

    Object.keys(data).forEach(key => {
        if (blackListField.includes(key)) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim()
        if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim())
        if (nullData.includes(data[key])) delete data[key]
    })

}

module.exports = {
    numberRandomGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    setFeatures,
    copyObject,
    deleteInvalidPropertyInObject
}
