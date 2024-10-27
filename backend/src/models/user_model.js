    import mongoose from "mongoose";
    import jwt from "jsonwebtoken";
    import bcrypt from "bcrypt";

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
        },
        address: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true,
    });

    // Export the User model
    const User = mongoose.model("User", userSchema);
    export default User;
