require("dotenv").config()
const mongoose = require("mongoose")
const { userSchema } = require("./user")
const { adminSchema } = require("./admin")
const { courseSchema } = require("./courses")

mongoose.connect(process.env.MONGO_URI)

const Courses = mongoose.model('Courses', courseSchema)
const Users = mongoose.model('User', userSchema)
const Admins = mongoose.model('Admin', adminSchema)

module.exports = {
    Users,
    Admins,
    Courses
}
