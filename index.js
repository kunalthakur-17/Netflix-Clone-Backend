import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import databaseConnection from "./config/Database.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js"

dotenv.config({})
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("Hello World")
})
// http:localhost:3000
app.use("/api/v1/users",userRoute)
// first api 
// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login

databaseConnection().then(() => app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}))
