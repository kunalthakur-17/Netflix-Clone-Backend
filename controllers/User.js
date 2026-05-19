import { User } from "../models/userModel.js"

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

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        await User.create({
            fullName,
            email,
            password
        })

return res.status(201).json({message:"User created successfully"})


    } catch (error) {
        return res.status(500).json({
      message: "Server error",
      error: error.message,
        })
    }
}
