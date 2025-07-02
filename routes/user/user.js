
require("dotenv").config()
const express = require("express");
const { Users, Courses, Purchases } = require("../../db/dbIndex");
const userRouter = express.Router()
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../../utils/userMiddleware");

userRouter.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!username || !password) {
        return res.status(411).json({
            message: "Missing either username or password"
        })
    }

    const findExistingUsername = await Users.findOne({ username })
    if (findExistingUsername) {
        return res.status(411).json({
            message: "Username already taken"
        })
    }

    try {
        const createUser = await Users.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        const userId = createUser._id;
        const jwtToken = jwt.sign({
            userId
        }, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            msg: 'Signup Successful',
            token: jwtToken
        })
    } catch (error) {
        console.error(error)
    }
})

userRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(411).json({
            message: "Missing either username or password"
        })
    }

    const findExistingUsername = await Users.findOne({ username })
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
        const userId = findExistingUsername._id;
        const jwtToken = jwt.sign({
            userId
        }, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            msg: 'Welcome back user',
            token: jwtToken
        })
    } catch (error) {
        console.error(error)
    }
})

// Purchase a course
userRouter.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.userId;

    try {

        const purchaseCourse = await Purchases.create({
            courseId: courseId,
            userId: userId
        })

        res.status(200).json({
            message: "Course Purchase successful"
        })

    } catch (error) {
        console.error(error)
    }

})
// Lists all the courses
userRouter.get('/courses', async (req, res) => {
    try {
        const getAllCourses = await Courses.find()
        res.status(200).json({
            getAllCourses
        })
    } catch (error) {
        console.error(error)
    }
})

// List all courses purchased by user
userRouter.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const userId = req.userId;
    console.log(userId)

    try {
        const allPurchaseCourseId = await Purchases.find({
            userId: userId
        })

        const purchasedCourseId = allPurchaseCourseId.map(p => p.courseId)

        const allCoursesOfUser = await Courses.find({
            _id: {
                $in: purchasedCourseId
            }
        })
        console.log(allPurchaseCourseId)

        res.status(200).json({
            allCoursesOfUser
        })

    } catch (error) {
        console.error(error)
    }

})

module.exports = {
    userRouter
}
