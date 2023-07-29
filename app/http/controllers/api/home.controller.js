const Controller = require('../controllers')
module.exports = new class HomeController extends Controller {


    async indexPage(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                message: "آدرس مورد نظر رو وارد کنید"
            })
        } catch (err) {
            next(err)
        }
    }


}