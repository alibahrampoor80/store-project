const {getOtpSchema, checkOtpSchema} = require("../../../validator/user/auth.schema");
const createError = require("http-errors");
const {
    numberRandomGenerator,
    signAccessToken,
    verifyRefreshToken,
    signRefreshToken
} = require("../../../../utils/functions");
const {userModel} = require("../../../../models/users");
const {expires_in, user_role} = require("../../../../utils/constans");
const Controller = require('../../controllers')

class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body
            const code = numberRandomGenerator()
            const result = await this.saveUser(mobile, code)
            if (!result) throw createError.Unauthorized("ورود شما انجام نشد")

            return res.status(200).send({
                data: {
                    status: 200,
                    message: "کد اعتبار سنجی با موفیقت برای شما ارسال شد",
                    code,
                    mobile
                }
            })
        } catch (err) {
            next(createError.BadRequest(err.message))
        }
    }

    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const {mobile, code} = req.body
            const user = await userModel.findOne({mobile})
            if (!user) throw createError.NotFound("کاربری یافت نشد!")

            if (user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمیباشد");

            const now = (new Date()).getTime();

            if (+user.otp.expireIn < now) throw createError.Unauthorized('کد شما منقضی شده است')
            const accessToken = await signAccessToken(user._id)
            const refreshToken = await signRefreshToken(user._id)
            return res.json({
                data: {
                    accessToken,
                    refreshToken
                }
            })
        } catch (err) {
            // console.log(err)
            next(err)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body
            const mobile = await verifyRefreshToken(refreshToken)
            const user = await userModel.findOne({mobile})
            const accessToken = await signAccessToken(user._id)
            const newRefreshToken = await signRefreshToken(user._id)
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (err) {
            next(err)
        }
    }


    async saveUser(mobile, code) {
        const now = (new Date().getTime())

        let otp = {
            code,
            expireIn: now + 1200000
        }

        const result = await this.checkExitUser(mobile)
        if (result) {
            return (
                await this.updateUser(mobile, {otp})
            )
        }
        return !!(
            await userModel.create({
                mobile,
                otp,
                role: [user_role]
            })
        )
    }

    async checkExitUser(mobile) {
        const user = await userModel.findOne({mobile})
        return !!user
    }

    async updateUser(mobile, objectData) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", null, undefined, "0", NaN,].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await userModel.updateOne({mobile}, {$set: objectData})
        return !!updateResult.modifiedCount
    }

}

module.exports = {
    authController: new AuthController
}