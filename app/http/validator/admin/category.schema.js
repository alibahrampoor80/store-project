const Joi = require("joi");
const createHttpError = require("http-errors");
const {MongoIDPattern} = require("../../../utils/constans");


const categorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('عنوان دسته بندی صحیح نمیباشد')),
    parent: Joi.string().allow('').pattern(MongoIDPattern).allow("")
        .error(new Error("شناسه ی ارسالی والد صحیح نمیباشد"))
})


const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('عنوان دسته بندی صحیح نمیباشد')),

})



module.exports = {
    categorySchema,
    updateCategorySchema
}