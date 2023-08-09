const {adminApiCategoryRouter} = require("./category");
const {adminApiProductRouter} = require("./product");

const router = require("express").Router()


router.use('/category', adminApiCategoryRouter)
router.use('/products', adminApiProductRouter)

module.exports = {
    adminRoutes: router
}