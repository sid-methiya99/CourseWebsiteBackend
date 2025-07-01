const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }
})

module.exports = {
    adminSchema
}
