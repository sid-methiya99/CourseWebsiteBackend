
require("dotenv").config()
const express = require("express");
const { Users } = require("../../db/dbIndex");
const userRouter = express.Router()
const jwt = require("jsonwebtoken")

userRouter.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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
            password: password
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
    res.status(200).json({
        msg: 'Signup Successful',
        token: jwtKey
    })
})

// Lists all the courses
userRouter.get('/courses', async (req, res) => {
    res.status(200).json({
        msg: 'Signup Successful',
        token: jwtKey
    })
})

// Purchase a course
userRouter.post('/courses/:courseId', async (req, res) => {
    res.status(200).json({
        msg: 'Signup Successful',
        token: jwtKey
    })
})


// List all courses purchased by user
userRouter.get('/purchasedCourses', async (req, res) => {
    res.status(200).json({
        msg: 'Signup Successful',
        token: jwtKey
    })
})


module.exports = {
    userRouter
}
