import { use } from "react";
import { User } from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ messasge: "Fill in all fields! "})
        }

        const existing = await User.findOne({ email: email.toLowerCase() })
        if (existing) {
            return res.status(400).json({ messasge: "User Already Exists"})
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
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

export {
    registerUser
}