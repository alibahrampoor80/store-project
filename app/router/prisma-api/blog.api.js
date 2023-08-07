const {id} = require("joi/lib/base")
const createError = require('http-errors')
const {createBlogSchema} = require('../../http/validator/admin/blog.schema')

const router = require("express").Router()

const prisma = (new (require("@prisma/client")).prismaClient())
/**
 * @swagger
 *  /blogs/list:
 *      get :
 *          tags : [Prisma(Api)]
 *          summary : get list of blogs with postgreSQL and prisma
 *          responses :
 *              200 :
 *                  description : success
 *
 *
 *
 */


