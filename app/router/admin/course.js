const {CourseController} = require("../../http/controllers/admin/courses/course.controller");
const {uploadFile} = require("../../utils/multer");
const {stringToArray} = require("../../http/middleware/stringToArray");
const router = require('express').Router()


router.get('/list', CourseController.getListOfCourses)
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.addCourses)
// router.post('/add-chapter', CourseController.addChapter)
router.get('/:id', CourseController.getCourseById)

module.exports = {
    adminApiCourseRouter: router
}