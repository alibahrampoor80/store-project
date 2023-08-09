const {default: mongoose} = require('mongoose')
const {CommentSchema} = require("./public.schema");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, required: true, ref: "category"},
    comments: {type: [CommentSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    desLikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number,},
    type: {type: String, required: true},
    format: {type: String,},
    supplier: {type: mongoose.Types.ObjectId, required: true},
    feature: {
        type: Object,
        default: {
            length: "",
            height: "",
            width: "",
            weight: "",
            colors: [],
            model: [],
            madeIn: ""
        }
    },
})


module.exports = {
    productModel: mongoose.model("product", productSchema)
}