const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    published: {
        type: String,
        enum: ["true", "false"],
        required: true,
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
})

module.exports = {
    courseSchema
}
