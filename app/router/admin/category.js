const {CategoryController} = require("../../http/controllers/admin/category.controller");
const router = require("express").Router()


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags : [category(AdminPanel)]
 *          summary : create new category title
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *              -   in : formData
 *                  type : string
 *                  required : true
 *                  name : title
 *              -   in : formData
 *                  type : string
 *                  required : false
 *                  name : parent
 *          responses :
 *              201 :
 *                  description : success
 */


router.post('/add', CategoryController.addCategory)


/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags : [category(AdminPanel)]
 *          summary : get all parents of category
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/parents', CategoryController.getAllParent)


/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags : [category(AdminPanel)]
 *          summary : get all parents of category
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *              -   in : path
 *                  name : parent
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/children/:parent', CategoryController.getChildOfParents)


/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags : [category(AdminPanel)]
 *          summary : get all categories
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/all', CategoryController.getAllCategory)




/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags : [category(AdminPanel)]
 *          summary : get all category
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/list-of-all', CategoryController.getAllCategoryWithoutPopulate)

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags : [category(AdminPanel)]
 *          summary : edit update category title by id
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *              -   in : formData
 *                  name : title
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *              500 :
 *                  description : internal server error
 *
 *
 */

router.patch('/update/:id', CategoryController.editCategoryTitle)


/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags : [category(AdminPanel)]
 *          summary : find category by id
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.get('/:id', CategoryController.getCategoryById)


/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags : [category(AdminPanel)]
 *          summary : remove  category
 *          parameters :
 *              -   in : header
 *                  example : bearer token...
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMzE0OTM3MSIsImlhdCI6MTY5MTM5NTk5MSwiZXhwIjoxNjkxNDgyMzkxfQ.FiKsqHmHbKxK1RZXAO32P0qp2malqjapzQN_5VN9BQU
 *                  name : accesstoken
 *                  type : string
 *                  required : true
 *              -   in : path
 *                  name : id
 *                  type : string
 *                  required : true
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 */

router.delete('/remove/:id', CategoryController.removeCategory)




module.exports = {
    categoryRoutes: router
}