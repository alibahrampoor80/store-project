const router = require('express').Router()
const bcrypt = require('bcrypt')
const {numberRandomGenerator} = require("../utils/functions");

/**
 * @swagger
 *  tags:
 *     name : Developer-routes
 *     description : developer utils
 *
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags : [Developer-routes]
 *          summary : hash data with bcrypt
 *          parameters :
 *              -   in : path
 *                  type : string
 *                  name : password
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/password-hash/:password', (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const {password} = req.params
    return res.status(200).json({
        status: 200,
        data: bcrypt.hashSync(password, salt)
    })
})

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags : [Developer-routes]
 *          summary : get random number
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/random-number', (req, res, next) => {

    res.status(200).json({
        status: 200,
        data: numberRandomGenerator().toString()
    })
})

module.exports = {
    developerRoutes: router
}