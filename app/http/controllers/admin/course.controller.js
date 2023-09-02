const Controller = require('../controllers')
const {courseModel} = require("../../../models/course");
const {StatusCodes: statusCode} = require('http-status-codes')
const path = require("path");
const {createCourseSchema} = require("../../validator/admin/course.schema");
const createHttpError = require("http-errors");

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
            await createCourseSchema.validateAsync(req.body)
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            let {title, short_text, text, tags, category, price, discount = 0, type, discountedPrice} = req.body;
            const teacher = req.user._id
            const course = await courseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                type,
                discountedPrice,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher
            })

            if (!course?._id) throw createHttpError.InternalServerError("دوره ایجاد نشد")

            return res.status(statusCode.OK).json({
                status: statusCode.CREATED,
                message: "دوره با موفقیت ایجاد شد"
            })
        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    CourseController: new CourseController()
}