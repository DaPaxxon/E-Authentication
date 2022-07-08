const mongoose=require("mongoose");

const Schema = mongooseSchema

const otpSchema = new Schema({
    otp: {
        type: String,
        required: [true, "Please provide otp"],
        unique: [true, "Otp already exists"],
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: [true, "Username already has OTP"]
    }
}, {timestamps: true})

const Otp = mongoose.model("Otp", otpSchema);

module.exports=Otp