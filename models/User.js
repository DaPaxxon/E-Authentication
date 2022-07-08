const mongoose = require("mongoose");
const Joi = require("joi");

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

const validateUser = (user) => {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2}).min(5).max(500).required().label("Email is empty or invalid"),
      username: Joi.string().min(2).required().label("Username is empty or has less than 2 characters"),
      fullname: Joi.string().min(2).required().label("First name is empty or has less than 2 characters"),
      phone: Joi.string().required().label("Please provide phone number"),
      password: Joi.string().min(8).required().label("Password must be atleast 8 characters"),
      confPassword: Joi.string().min(8).required().label("Password must be atleast 8 characters"),
    })
    return schema.validate(user)
}


module.exports = {
    User,
    validateUser
};