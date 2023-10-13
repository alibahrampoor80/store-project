const Controller = require('../../controllers')
const {courseModel} = require("../../../../models/course");
const {StatusCodes: statusCode} = require('http-status-codes')
const path = require("path");
const {createCourseSchema} = require("../../../validator/admin/course.schema");
const createHttpError = require("http-errors");
const {isValidObjectId} = require("mongoose");

class CourseController extends Controller {
    async getListOfCourses(req, res, next) {
        try {
            const {search} = req.query
            let courses
            if (search) courses = await courseModel.find({$text: {$search: search}}).sort({_id: -1})
            else courses = await courseModel.find({}).sort({_id: -1})
            return res.status(statusCode.OK).json({
                status: statusCode.OK,
                data: {
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
            if (Number(price) > 0 && type === 'free') throw createHttpError.BadRequest("برای دوره ی رایگان نمیتوان قیمت ثبت کرد")
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
                data: {
                    message: "دوره با موفقیت ایجاد شد"
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getCourseById(req, res, next) {
        try {
            const {id} = req.params
            const course = await courseModel.findById(id)
            if (!course) throw createHttpError.NotFound(" دوره ای یافت نشد ")
            return res.status(statusCode.OK).json({
                status: statusCode.OK,
                data: {
                    course
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async addChapter(req, res, next) {
        try {
            const {id, title, text} = req.body
            await this.findCourseById(id)
            const saveChapterResult = await courseModel.updateOne({_id: id}, {
                $push: {
                    chapters: {title, text, episodes: []}
                }
            })
            if (saveChapterResult.modfiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد")
            return res.status(statusCode.CREATED).json({
                status: statusCode.CREATED,
                data: {
                    message: "فصل با موفیقت ایجاد شد"
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async findCourseById(id) {
        if (!isValidObjectId(id)) throw createHttpError.BadRequest("شناسه صحیح نمیباشد")
        const course = await courseModel.findById(id)
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد")
        return course
    }

}

module.exports = {
    CourseController: new CourseController()
}