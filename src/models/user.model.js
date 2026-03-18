import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
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
            maxLength: 255,

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

// Password Hashing

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)