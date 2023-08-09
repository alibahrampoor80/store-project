const {ProductController} = require("../../http/controllers/admin/product.controller");
const {uploadFile} = require("../../utils/multer");
const {stringToArray} = require("../../http/middleware/stringToArray");
const router = require('express').Router()


router.post("/add", uploadFile.array('images', 10),
    stringToArray('tags'), ProductController.addProduct)


module.exports = {
    adminApiProductRouter: router
}