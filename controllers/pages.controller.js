const {User}=require("../models/User");
const Course=require("../models/Course");


const homepage=(req, res) => {
    res.status(200).render("Index", {message: null, data: null, error: null})
}


const loginPage=(req, res) => {
    res.status(200).render("Login", {message: null, data: null, error: null})
}


const registerPage=(req, res) => {
    res.status(200).render("Register", {message: null, data: null, error: null})
}


const verifyOtpPage=(req, res) => {
    res.status(200).render("VerifyOtp", {message: null, data: res.locals.user, error: null})
}


const dashboardPage = (req, res) => {
    
    res.status(200).render("Dashboard", {message: null, data: res.locals.user, error: null})
}




const confirmPaymentPage = (req, res) => {
    
    res.status(200).render("ConfirmPayment", {message: null, data: res.locals.user, error: null})
}


const registerCoursesPage = async (req, res) => {
    try {
        if (req.session.canRegisterCourse === true) {
            res.locals.canRegisterCourse = true
            let pickedData = (({
                _id, email, username, password,
                phone, fullname, createdAt, updatedAt
            }) => ({
                _id, email, username, password,
                phone, fullname, createdAt, updatedAt
            }))(res.locals.user)

            const courses = await Course.find({});
            if (courses[0]) {
                
                let data = { ...pickedData, courses: courses, canRegisterCourse: res.locals.canRegisterCourse }
                res.status(200).render("CourseRegistration", { message: null, data: data, error: null })
            } else {
                res.status(404).render("CourseRegistration", { message: null, data: data, error: null })
            }
        } else {
            res.status(403).render("VerifyOtp", { message: null, data: res.locals.user, error: "Enter otp to proceed" })
        }
    } catch (e) {
        res.status(500).render("VerifyOtp", { message: null, data: res.locals.user, error: "Something went wrong!" })
    }
    
}




const addCoursesPage = async (req, res) => {
    try {
        const courses = await Course.find({});
        if (courses[0]) {
            let pickedData = (({ 
                title, unit, type, session, level,
                semester
            }) => ({
                title, unit, type, session, level,
                semester
            }))(courses)
            res.status(200).render("AddCourse", { message: null, data: {...pickedData, courses: courses}, error: null })
        } else {
            res.status(404).render("AddCourse", { message: null, data: res.locals.user, error: null })
        }
    } catch (e) {
        res.status(500).render("AddCourse", {message: null, data: res.locals.user, error: "Something went wrong"})
    }
    
}

const allUsersPage = async (req, res) => {
    try {

        const users = await User.find({});
        if (users) {
            
            res.status(200).render("Users", { message: null, data: { email: res.locals.user.email, username: res.locals.user.username, users: users }, error: null})
        } else {
            res.status(200).render("Users", { message: null, data: { email: res.locals.user.email, username: res.locals.user.username, users: [] }, error: null})
        }
        
    } catch (e) {
        res.status(500).json({ message: null, data: null, error: "Something went wrong"})
    }
}

module.exports = {
    homepage,
    loginPage,
    registerPage,
    verifyOtpPage,
    dashboardPage,
    confirmPaymentPage,
    registerCoursesPage,
    addCoursesPage,
    allUsersPage
}