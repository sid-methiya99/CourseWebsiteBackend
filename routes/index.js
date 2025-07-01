const express = require("express");
const { userRouter } = require("./user/user");
const { adminRouter } = require("./admin/admin");
const { courseRouter } = require("./course/course");
const router = express.Router()

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/courses", courseRouter)

module.exports = {
    router
}
