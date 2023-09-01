const {adminApiCategoryRouter} = require("./category");
const {adminApiProductRouter} = require("./product");
const {adminApiCourseRouter} = require("./course");

const router = require("express").Router()


router.use('/category', adminApiCategoryRouter)
router.use('/products', adminApiProductRouter)
router.use('/courses', adminApiCourseRouter)

module.exports = {
    adminRoutes: router
}