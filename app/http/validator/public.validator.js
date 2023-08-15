const Joi = require('joi')
const {MongoIDPattern} = require("../../utils/constans");
const createHttpError = require("http-errors");

const ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(new Error(createHttpError.BadRequest('شناسه وارد شده صحیح نمیباشد'))),
})

module.exports = {
    ObjectIdValidator
}