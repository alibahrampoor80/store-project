const {CourseController} = require("../../http/controllers/admin/course.controller");
const {uploadFile} = require("../../utils/multer");
const {stringToArray} = require("../../http/middleware/stringToArray");
const router = require('express').Router()


router.get('/list', CourseController.getListOfCourses)
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.addCourses)

module.exports = {
    adminApiCourseRouter: router
}