const express = require("express");
const { userRouter } = require("./user/user");
const { adminRouter } = require("./admin/admin");
const { courseRouter } = require("./course/course");
const mainRouter = express.Router()

mainRouter.use("/user", userRouter)
mainRouter.use("/admin", adminRouter)
mainRouter.use("/courses", courseRouter)

module.exports = {
    mainRouter
}
