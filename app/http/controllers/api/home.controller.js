const Controller = require('../controllers')
const {StatusCodes: httpStatus} = require('http-status-codes')
module.exports = new class HomeController extends Controller {


    async indexPage(req, res, next) {
        try {
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: {
                    message: "آدرس مورد نظر رو وارد کنید"
                },

            })
        } catch (err) {
            next(err)
        }
    }


}