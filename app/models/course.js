const {default: mongoose} = require('mongoose')
const {CommentSchema} = require("./public.schema");

const episodes = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "unlock"},
    time: {type: String, required: true},
    videoAddress: {type: String, required: true}
}, {toJSON: {virtuals: true}})

const chapter = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: "",},
    episodes: {type: [episodes], default: [],},
})

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, required: true, ref: "category"},
    comments: {type: [CommentSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []},
    desLikes: {type: [mongoose.Types.ObjectId], default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, required: true, default: "free"},
    status: {type: String, default: "notStarted"},//notStarted - completed - holding
    time: {type: String, default: "00:00:00"},
    teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapters: {type: [chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
})

courseSchema.index({
    title: "text", short_text: "text", text: "text"
})

module.exports = {
    courseModel: mongoose.model("course", courseSchema)
}