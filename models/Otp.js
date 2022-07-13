const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp: {
        type: String,
        required: [true, "Please provide otp"],
        unique: [true, "Otp already exists"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: [true, "email already has OTP"]
    },
    userId: {
        type: String,
        required: [true, "Please provide user id"],
        unique: [true, "id already has OTP"]
    },
}, {timestamps: true})

const Otp = mongoose.model("Otp", otpSchema);

module.exports=Otp