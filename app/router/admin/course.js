const {CourseController} = require("../../http/controllers/admin/course.controller");
const router = require('express').Router()


router.get('/list', CourseController.getListOfCourses)


module.exports = {
    adminApiCourseRouter: router
}