const jwt = require("jsonwebtoken");
const createError = require('http-errors')
const {userModel} = require("../../models/users");

function verifyAccessToken(req, res, next) {
    const headers = req.headers
    const [bearer, token] = headers?.accesstoken?.split(" ") || []

    if (token && bearer?.toLowerCase() == 'bearer') {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {},
            async (err, payload) => {
                if (err) return next(createError.Unauthorized('وارد حساب کاربری خود شوید'))
                const {mobile} = payload || {}
                const user = await userModel.findOne({mobile}, {password: 0, otp: 0, __V: 0})
                if (!user) return next(createError.Unauthorized("حساب کاربری یافت نشد!"))
                req.user = user

                return next()
            })
    } else return next(createError.Unauthorized("لطفا مجدد وارد حساب کاربری خود شوید"))
}

module.exports = {
    verifyAccessToken
}