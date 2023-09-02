const Controller = require('../controllers')
const {courseModel} = require("../../../models/course");
const {StatusCodes: statusCode} = require('http-status-codes')

class CourseController extends Controller {
    async getListOfCourses(req, res, next) {
        try {
            const {search} = req.query
            let courses
            if (search) courses = await courseModel.find({$text: {$search: search}}).sort({_id: -1})
            else courses = await courseModel.find({}).sort({_id: -1})
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

    async addCourses(req, res, next) {
        try {
            const data = req.body
            res.status(statusCode.OK).json(data)
        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    CourseController: new CourseController()
}