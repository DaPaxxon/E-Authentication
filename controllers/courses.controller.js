const { v4: uuidv4 } = require('uuid');

const { User } = require("../models/User");
const Otp=require("../models/Otp");
const Course = require('../models/Course');


const saveOtp = (user, req, res) => {
    let code = uuidv4();
    let otp = new Otp({
        otp: code,
        email: user.email,
        userId: user._id
    })

    otp.save((err, saved) => {
        if (err) {
            res.status(500).render("ConfirmPayment", { message: null, data: null, error: "Something went wrong" })
        } else {
            res.status(201).render("ConfirmPayment", { message: `User OTP sent please use ${saved.otp} as your otp before registering courses`, data: saved, error: null })
        }
    })
}

const genOtp = async (user, req, res)=>{
    
    try {
        const oldOtp = await Otp.findOne({ userId: user._id })
        
        if (oldOtp) {
            const deleteOldOtp = await Otp.findByIdAndDelete(oldOtp._id);
            if (deleteOldOtp) {
                saveOtp(user, req, res)
            } else {
                res.status(500).render("ConfirmPayment", { message: null, data: null, error: "We could not generate a new otp. Please try later" })
            }
        } else {
            saveOtp(user, req, res)
        }
    } catch (e) {
        res.status(500).render("ConfirmPayment", { message: null, data: null, error: "Something went wrong" })
    }
    
}

const confirm_payment_post = async (req, res) => {
    try {
        if (req.body.paymentId === "Up25700") {
            const user = await User.findById(req.session.userId)
            if (user) {
                genOtp(user, req, res);
            } else {
                res.status(403).render("ConfirmPayment", { message: null, data: null, error: "Could not fetch your etails" });
            }
            
        } else {
            res.status(400).render("ConfirmPayment", { message: null, data: null, error: "Payment Id you inputed is incorrect" });
        }
    } catch (e) {
        res.status(500).render("ConfirmPayment", { message: null, data: null, error: "Something went wrong!" });
    }
}


const verify_post = async (req, res) => {
    try {
        const otpVerified = await Otp.findOne({ otp: req.body.otp, userId: req.session.userId })
   
        if (otpVerified) {
            const deleteOtp = await Otp.findByIdAndDelete(otpVerified._id)
            if (deleteOtp) {
                req.session.canRegisterCourse = true
                res.status(200).redirect("/course-registration")
            } else {
                res.status(500).render("VerifyOtp", { message: null, data: res.locals.user, error: "Something went wrong" })
            }
            
        } else {
            res.status(403).render("VerifyOtp", { message: null, data: res.locals.user, error: "Otp incorrect" })
        }
    } catch (e) {
        res.status(500).render("VerifyOtp", { message: null, data: res.locals.user, error: "Something went wrong" })
    }
}



const add_course_post=(req, res)=> {
    let body = req.body;

    let course = new Course({
        title: body.title,
        code: body.code,
        unit: body.unit,
        type: body.type,
        session: body.session,
        level: body.level,
        semester: body.semester
    })
    course.save((err, saved) => {
        if (err) {
            res.status(500).render("AddCourse", {message: null, data: res.locals.user, error: "Could not add course"})
        } else {
            res.status(200).render("AddCourse", {message: "Course added. Please refresh", data: res.locals.user, error: null})
        }
    })
}


const del_course = async (req, res) => {
    try {
        const delCourse = await Course.findByIdAndDelete(req.params.id);
        if (delCourse) {
            res.status(200).redirect("/add-course");
        } else {
            res.status(500).redirect("/add-course")
        }
    } catch (e) {
        res.status(500).render("AddCourse", { message: null, data: res.locals.user, error: "Something went wrong" })
    }
}
module.exports = {
    confirm_payment_post,
    verify_post,
    add_course_post,
    del_course
}