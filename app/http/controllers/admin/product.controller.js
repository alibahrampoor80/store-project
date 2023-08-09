const Controller = require('../controllers')

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            res.json(req.body)

        } catch (err) {
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

    async removeProduct(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async getAllProduct(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    async getOneProduct(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }


}


module.exports = {
    ProductController: new ProductController()
}