const {adminApiCategoryRouter} = require("./category");
const {adminApiProductRouter} = require("./product");
const {adminApiCourseRouter} = require("./course");
const {AdminApiChapterRouter} = require("./chapter");

const router = require("express").Router()


router.use('/category', adminApiCategoryRouter)
router.use('/products', adminApiProductRouter)
router.use('/courses', adminApiCourseRouter)
router.use('/chapter', AdminApiChapterRouter)

module.exports = {
    adminRoutes: router
}