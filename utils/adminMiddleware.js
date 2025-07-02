require("dotenv").config()
const jwt = require("jsonwebtoken")
const { Admins } = require("../db/dbIndex")
const adminMiddleware = async (req, res, next) => {
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

    console.log(token)
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const findAdmin = await Admins.findOne({
            _id: decode.userId
        })

        if (!decode) {
            return res.status(403).json({
                message: "Invalid token"
            })
        }

        req.adminId = decode.adminId;
        next()

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    adminMiddleware
}
