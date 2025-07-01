const express = require("express");
const adminRouter = express.Router()

adminRouter.post('/signup', async (req, res) => {

})

adminRouter.post('login', async (req, res) => {

})

// Creates a new course
adminRouter.post('/courses', async (req, res) => {

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
