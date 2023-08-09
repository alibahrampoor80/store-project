const Controller = require('../controllers')
const {categoryModel} = require("../../../models/category");
const createError = require("http-errors");
const {categorySchema, updateCategorySchema} = require("../../validator/admin/category.schema");
const mongoose = require('mongoose')

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            console.log(req.body)
            const {title, parent} = req.body
            await categorySchema.validateAsync(req.body)
            const category = await categoryModel.create({title, parent})
            if (!category) throw createError.InternalServerError("خطای داخلی")
            return res.status(201).json({
                data: {
                    status: 201,
                    message: "دسته بندی با موفیقت افزوده شد!"
                }

            })
        } catch (err) {

            next(err)
        }
    }

    async removeCategory(req, res, next) {
        try {
            const {id} = req.params
            const category = await this.checkExistCategory(id)
            // const deleteResult = await categoryModel.deleteOne({_id: category._id})
            const deleteResult = await categoryModel.deleteMany({
                $or: [
                    {_id: category},
                    {parent: category._id}
                ]
            })
            if (deleteResult.deletedCount == 0) throw createError.InternalServerError('حذف دسته بندی انجام نشد')
            return res.status(200).json({
                data: {
                    status: 200,
                    message: "حذف دسته بندی با موفقیت انجام شد!"
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async editCategoryTitle(req, res, next) {
        try {
            const {id} = req.params
            const {title} = req.body
            await updateCategorySchema.validateAsync(req.body)
            await this.checkExistCategory(id)
            const resultUpdate = await categoryModel.updateOne({_id: id}, {$set: {title}})
            if (resultUpdate.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی انجام نشد!")
            return res.status(200).json({
                data: {
                    status: 200,
                    message: "بروز رسانی با موفقیت انجام شد!"
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllCategory(req, res, next) {
        try {
            // const categories = await categoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children",
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])
            const categories = await categoryModel.find({parent: undefined}, {__v: 0})

            return res.status(200).json({
                data: {
                    status: 200,
                    categories
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const {id: _id} = req.params

            const category = await categoryModel.aggregate([
                {
                    $match: {_id: new mongoose.Types.ObjectId(_id)}
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children",
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },
            ])
            return res.status(200).json({
                data: {
                    status: 200,
                    category
                }
            })
        } catch (err) {
            next(err)
        }
    }


    async getAllParent(req, res, next) {
        try {
            const parents = await categoryModel.find({parent: undefined}, {__v: 0})
            return res.status(200).json({
                data: {
                    status: 200,
                    parents
                }
            })

        } catch (err) {
            next(err)
        }
    }


    async getChildOfParents(req, res, next) {
        try {
            const {parent} = req.params
            const children = await categoryModel.find({parent}, {__v: 0, parent: 0})

            return res.status(200).json({
                data: {
                    status: 200,
                    children
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllCategoryWithoutPopulate(req, res, next) {
        try {
            const categories = await categoryModel.aggregate([
                {
                    $match: {}
                }
            ])
            return res.status(200).json({
                status: 200,
                categories
            })
        } catch (err) {
            next(err)
        }
    }

    async checkExistCategory(id) {
        const category = await categoryModel.findById(id)
        if (!category) throw createError.NotFound("دسته بندی یافت نشد")
        return category
    }

}


module.exports = {
    CategoryController: new CategoryController()
}