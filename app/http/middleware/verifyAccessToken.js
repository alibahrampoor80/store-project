const jwt = require("jsonwebtoken");
const createError = require('http-errors')
const {userModel} = require("../../models/users");


function getToken(headers) {
    // console.log(headers.authorization)
    const [bearer, token] = headers?.authorization?.split(" ") || []
    if (token && bearer?.toLowerCase() == 'bearer') return token
    throw createError.Unauthorized("حساب کاربری جهت ورود شناسایی نشد لطفا وارد حساب کاربری خود شوید")
}

function verifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {},
            async (err, payload) => {
                try {

                    if (err) throw createError.Unauthorized('وارد حساب کاربری خود شوید')
                    const {mobile} = payload || {}
                    const user = await userModel.findOne({mobile}, {password: 0, otp: 0, __V: 0})
                    if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد!")
                    req.user = user
                    return next()

                } catch (err) {
                    next(err)
                }
            })


    } catch (err) {
        next(err)
    }
}

function checkRole(role) {
    return function (req, res, next) {
        try {
            const user = req.user
            if (user.Roles.includes(role)) return next()
            throw createError.Forbidden("شما به این قسمت دسترسی ندارید")

        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    verifyAccessToken,
    checkRole
}