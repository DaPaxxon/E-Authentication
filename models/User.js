const mongoose=require("mongoose")

const Schema=mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    phone: {
        type: String,
        required: [true, "Please provide phone number"]
    },
    fullname: {
        type: String,
        required: [true, "Please provide full name"]
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;