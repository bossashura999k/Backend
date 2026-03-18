import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Fill in all fields! "})
        }

        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) {
            return res.status(400).json({ message: "User Already Exists"})
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            loggedIn: true,
        });

        res.status(201).json({
            message: "Registration Successful",
            user: { id: user._id, email: user.email, username: user.username }
        })
    } catch (error) {
        res.status(500).json({ message: "Server Internal Error", error: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "Not Found"
        })

        const passMatch = await user.comparePassword(password);
        if (!passMatch) return res.status(400).json({
            message: "Invalid Password" 
        }) 

        res.status(200).json({
            message: "User Logged In Successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Error on the Server"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout Successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}
