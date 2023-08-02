const {categoryRoutes} = require("./category");
const router = require("express").Router()

/**
 * @swagger
 * tags :
 *   -      name : admin-panel
 *          description : action of admin (add remove edit get)
 *   -      name : category(AdminPanel)
 *          description : all method and routes for category section
 *
 *
 */

router.use('/category', categoryRoutes)

module.exports = {
    adminRoutes: router
}