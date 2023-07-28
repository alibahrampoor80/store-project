const Controller = require('../controllers')

module.exports = new class HomeController extends Controller {
    // constructor() {
    //     super();
    // }

    indexPage(req, res, next) {

        return res.status(200).json({
            status: 200,
            message: "آدرس مورد نظر رو وارد کنید"
        })
    }


}