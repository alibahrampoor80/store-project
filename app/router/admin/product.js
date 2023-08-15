const {ProductController} = require("../../http/controllers/admin/product.controller");
const {uploadFile} = require("../../utils/multer");
const {stringToArray} = require("../../http/middleware/stringToArray");
const router = require('express').Router()


router.post("/add", uploadFile.array('images', 10),
    stringToArray('tags'), stringToArray('colors'), ProductController.addProduct)

router.get('/list', ProductController.getAllProduct)
router.get('/:id', ProductController.getOneProduct)
router.delete('/remove/:id', ProductController.removeProductById)

module.exports = {
    adminApiProductRouter: router
}