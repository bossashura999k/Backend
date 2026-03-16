import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 20,

        },

        password: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 15,

        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }

    },

    {}
)   

export const User = mongoose.model("User", userSchema)