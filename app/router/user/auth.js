const {authController} = require("../../http/controllers/user/auth/auth.controller");
const router = require('express').Router()

/**
 * @swagger
 *  tags:
 *      name : user-authentication
 *      description : auth section
 *
 */

/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          summary: login user with phone number
 *          description : one time password (otp) login
 *          tags: [user-authentication]
 *          parameters :
 *           -   name : mobile
 *               description : fa-ir phone number
 *               in : formData
 *               required : true
 *               type : string
 *          responses:
 *              201 :
 *                 description : Success
 *              400 :
 *                 description : Bad Request
 *              401 :
 *                  description : Unauthorization
 *              500 :
 *                  description : internal Server Error
 */


router.post('/get-otp', authController.getOtp)

/**
 * @swagger
 * /user/check-otp:
 *      post:
 *         summary : check-otp value in user controller
 *         description : check otp with code mobile and expires date
 *         tags: [user-authentication]
 *
 *         parameters :
 *         -   name : mobile
 *             description : fa-ir phone number
 *             in : formData
 *             required : true
 *             type : string
 *         -   name : code
 *             description : get sms code res
 *             in : formData
 *             required : true
 *             type : string
 *         responses:
 *              201 :
 *                 description : Success
 *              400 :
 *                 description : Bad Request
 *              401 :
 *                  description : Unauthorization
 *              500 :
 *                  description : internal Server Error
 *
 */

router.post('/check-otp', authController.checkOtp)

module.exports = {
    UserAuthRoutes: router
}
