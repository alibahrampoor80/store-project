const Controller = require('../controllers')
const {productSchema} = require("../../validator/admin/product.schema");
const path = require("path");
const {
    deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject
} = require("../../../utils/functions");
const {productModel} = require("../../../models/products");
const {ObjectIdValidator} = require("../../validator/public.validator");
const createHttpError = require("http-errors");
const {StatusCodes: httpStatus} = require('http-status-codes')

const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
}
Object.freeze(ProductBlackList)

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const productBody = await productSchema.validateAsync(req.body)
            const {
                title, text, short_text, category, tags, count, discount, type} = productBody
            const supplier = req.user._id
            let feature = setFeatures(req.body)


            const product = await productModel.create({
                title, text, short_text, category, tags, count, discount, images, feature, supplier, type
            })

            return res.status(httpStatus.CREATED).json({
                status: httpStatus.CREATED,
                data: {
                    message: "ثبت محصول با موفقیت انجام شد"
                }
            })
        } catch (err) {
            deleteFileInPublic(req.body.images)
            next(err)
        }
    }

    async updateProduct(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async editProduct(req, res, next) {
        try {
            const {id} = req.params
            const product = await this.findProduct(id)
            const data = copyObject(req.body)

            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            data.feature = setFeatures(req.body)
            let blackListField = Object.values(ProductBlackList)
            deleteInvalidPropertyInObject(data, blackListField)

            const updateProductResult = await productModel.updateOne({_id: product._id}, {$set: data})
            if (updateProductResult.modifiedCount == 0) throw {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "خطای داخلی"
            }

            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: {
                    message: "بروزرسانی با موفیقت انجام شد"
                }
            })

        } catch (err) {
            next(err)
        }
    }

    async removeProductById(req, res, next) {
        try {
            const {id} = req.params
            const product = await this.findProduct(id)
            const removeProductResult = await productModel.deleteOne({_id: product._id})
            if (removeProductResult.deleteCount == 0) throw createHttpError.InternalServerError("حذف محصول انجام نشد!")
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: {
                    message: "حذف محصول با موفقیت انجام شد "
                }
            })


        } catch (err) {
            next(err)
        }
    }

    async getAllProduct(req, res, next) {
        try {
            const {search} = req?.query

            let products
            if (search) {
                products = await productModel.find({
                    $text: {
                        $search: new RegExp(search, 'ig') || ""
                    }
                })
            } else {
                products = await productModel.find({})
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: {
                    products
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const {id} = req.params
            const product = await this.findProduct(id)
            res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: {
                    product
                }
            })
        } catch (err) {
            next(err)
        }
    }


    async findProduct(productId) {
        const {id} = await ObjectIdValidator.validateAsync({id: productId})
        const product = await productModel.findById(id)
        if (!product) throw createHttpError.NotFound("محصولی یافت نشد!")
        return product
    }

}


module.exports = {
    ProductController: new ProductController()
}