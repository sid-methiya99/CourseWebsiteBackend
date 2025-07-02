const express = require("express");
const { userRouter } = require("./user/user");
const { adminRouter } = require("./admin/admin");
const mainRouter = express.Router()

mainRouter.use("/user", userRouter)
mainRouter.use("/admin", adminRouter)

module.exports = {
    mainRouter
}
