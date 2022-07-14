const {User}=require("../models/User");


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
    res.status(200).render("VerifyOtp", {message: null, data: null, error: null})
}


const dashboardPage = (req, res) => {
    
    res.status(200).render("Dashboard", {message: null, data: res.locals.user, error: null})
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
    allUsersPage
}