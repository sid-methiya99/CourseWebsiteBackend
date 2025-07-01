const express = require("express");
const { userRouter } = require("../db/user");
const { adminRouter } = require("../db/admin");
const { courseRouter } = require("../db/courses");
const router = express.Router()

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/courses", courseRouter)

module.exports = {
    router
}
