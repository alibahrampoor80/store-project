const HomeController = require('../../http/controllers/api/home.controller')
const router = require('express').Router()
/**
 *  @swagger
 * tags:
 *  name : indexPage
 *  description : ادرس صفحه ی اصلی
 */


/**
 * @swagger
 * /:
 *  get:
 *      summary: index page
 *      tags : [indexPage]
 *      description : get all data in index page
 *      responses:
 *          200:
 *             description : success
 *          404:
 *              description : not found
 */


router.get('/', HomeController.indexPage)

module.exports = {
    HomeRoutes: router
}

