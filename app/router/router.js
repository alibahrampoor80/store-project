const {HomeRoutes} = require("./api");
const {UserAuthRoutes} = require("./user/auth");
const {developerRoutes} = require("./developer.routes");
const {adminRoutes} = require("./admin/admin.routes");

const router = require('express').Router()

router.use("/user", UserAuthRoutes)
router.use("/admin", adminRoutes)
router.use("/developer", developerRoutes)
router.use("/", HomeRoutes)

module.exports = {
    allRoutes: router
}
