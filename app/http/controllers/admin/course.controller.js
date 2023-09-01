const Controller = require('../controllers')
const {courseModel} = require("../../../models/course");
const {StatusCodes: statusCode} = require('http-status-codes')

class CourseController extends Controller {
    async getListOfCourses(req, res, next) {
        try {
            const courses = await courseModel.find({})
            return res.status(statusCode.OK).json({
                data: {
                    status: statusCode.OK,
                    courses
                }
            })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    CourseController: new CourseController()
}