const Controller = require('../controllers')
const {productSchema} = require("../../validator/admin/product.schema");
const path = require("path");
const {deleteFileInPublic, ListOfImagesFromRequest} = require("../../../utils/functions");
const {productModel} = require("../../../models/products");
const {ObjectIdValidator} = require("../../validator/public.validator");
const createHttpError = require("http-errors");


class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {

            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)

            const productBody = await productSchema.validateAsync(req.body)

            const {
                title,
                text,
                short_text,
                category,
                tags,
                count,
                discount,
                width,
                height,
                weight,
                length,
                colors
            } = productBody

            const supplier = req.user._id
            let feature = {}, type = "physical"

            feature.colors = colors
            if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
                if (!width) feature.width = 0
                else feature.width = +width
                if (!height) feature.height = 0
                else feature.height = +height
                if (!weight) feature.weight = 0
                else feature.weight = +weight
                if (!length) feature.length = 0
                else feature.length = +length

            } else {
                type = "virtual"
            }


            const product = await productModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                count,
                discount,
                images,
                feature,
                supplier,
                type
            })

            return res.status(201).json({
                data: {
                    status: 201,
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
            return res.status(200).json({
                data: {
                    status: 200,
                    message: "حذف محصول با موفقیت انجام شد "
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllProduct(req, res, next) {
        try {
            const products = await productModel.find({})
            return res.status(200).json({
                data: {
                    status: 200,
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
            res.status(200).json({
                data: {
                    status: 200,
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