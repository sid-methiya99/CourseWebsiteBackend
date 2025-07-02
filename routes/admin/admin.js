require("dotenv").config()
const express = require("express");
const { Admins, Courses } = require("../../db/dbIndex");
const adminRouter = express.Router()
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../../utils/adminMiddleware");

adminRouter.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!username || !password) {
        return res.status(411).json({
            message: "Missing either username or password"
        })
    }

    const findExistingUsername = await Admins.findOne({ username })
    if (findExistingUsername) {
        return res.status(411).json({
            message: "Username already taken"
        })
    }

    try {
        const createUser = await Admins.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        const adminId = createUser._id;
        const jwtToken = jwt.sign({
            adminId
        }, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            msg: 'Signup Successful',
            token: jwtToken
        })
    } catch (error) {
        console.error(error)
    }
})

adminRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(411).json({
            message: "Missing either username or password"
        })
    }

    const findExistingUsername = await Admins.findOne({ username })
    if (!findExistingUsername) {
        return res.status(411).json({
            message: "Username not found"
        })
    }

    const matchPassword = await findExistingUsername.comparePassword(password);

    if (!matchPassword) {
        return res.status(411).json({
            message: "Incorrect password"
        })
    }

    try {
        const adminId = findExistingUsername._id;
        const jwtToken = jwt.sign({
            adminId
        }, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            msg: 'Welcome back admin',
            token: jwtToken
        })
    } catch (error) {
        console.error(error)
    }
})

// Creates a new course
adminRouter.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;

    if (!title || !description || !price || !imageLink || !published) {
        return res.status(411).json({
            message: "Missing value found in body"
        })
    }

    const adminId = req.adminId;

    try {
        const createCourse = await Courses.create({
            title,
            description,
            price,
            imageLink,
            published,
            authorId: adminId
        })

        res.status(200).json({
            msg: 'Course created successfully',
            courseId: createCourse._id
        })

    } catch (error) {
        console.error(error)
    }

})

// Edits an existing course
adminRouter.put('/courses/:courseId', async (req, res) => {

})

// Gets all courses of admins
adminRouter.get('courses', async (req, res) => {

})

module.exports = {
    adminRouter
}
