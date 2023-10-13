const {CategoryController} = require("../../http/controllers/admin/category/category.controller");
const router = require("express").Router()


router.post('/add', CategoryController.addCategory)

router.get('/parents', CategoryController.getAllParent)

router.get('/children/:parent', CategoryController.getChildOfParents)

router.get('/all', CategoryController.getAllCategory)

router.get('/list-of-all', CategoryController.getAllCategoryWithoutPopulate)

router.patch('/update/:id', CategoryController.editCategoryTitle)

router.get('/:id', CategoryController.getCategoryById)

router.delete('/remove/:id', CategoryController.removeCategory)

module.exports = {
    adminApiCategoryRouter: router
}