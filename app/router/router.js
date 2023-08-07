const {HomeRoutes} = require("./api");
const {UserAuthRoutes} = require("./user/auth");
const {developerRoutes} = require("./developer.routes");
const {adminRoutes} = require("./admin/admin.routes");
const {verifyAccessToken, checkRole} = require("../http/middleware/verifyAccessToken");

const router = require('express').Router()

router.use("/user", UserAuthRoutes)
router.use("/admin", verifyAccessToken, checkRole("ADMIN"), adminRoutes)
router.use("/developer", developerRoutes)
router.use("/", HomeRoutes)

module.exports = {
    allRoutes: router
}
