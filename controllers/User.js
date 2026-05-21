import { User } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Reigster = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) { return res.status(400).json({ message: "All fields are required" }) }
        if (!fullName) {
            return res.status(400).json({
                message: "Please add full name"
            })
        }
        if (!email) {
            return res.status(400).json({
                message: "Please add email"
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Please add password"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const haspasword = await bcryptjs.hash(password, 16)
        await User.create({
            fullName,
            email,
            password: haspasword
        })

        return res.status(201).json({ message: "User created successfully" })


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
}



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token,).json({
            message: "Login successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: token
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }

}


export const Logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true }).json({
            message: "Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
}
