require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const { mainRouter } = require("./routes/routesIndex")

app.use(express.json())
app.use(cors())

app.use("/api/v1", mainRouter)

app.listen(process.env.PORT, () => {
    console.log("Listening on port 3000")
})
