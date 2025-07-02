require("dotenv").config()
const jwt = require("jsonwebtoken")
const { Users } = require("../db/dbIndex")
const userMiddleware = async (req, res, next) => {
    const header = req.headers["authorization"]

    if (!header) {
        return res.status(403).json({
            message: "Header is missing"
        })
    }

    const token = header.split(' ')[1]

    if (!token) {
        return res.status(403).json({
            message: "Token is missing"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const findUser = await Users.findOne({
            _id: decode.userId
        })

        if (!decode) {
            return res.status(403).json({
                message: "Invalid token"
            })
        }

        req.userId = decode.userId;
        next()

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    userMiddleware
}
