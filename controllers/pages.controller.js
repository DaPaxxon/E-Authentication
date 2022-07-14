
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

module.exports = {
    homepage,
    loginPage,
    registerPage,
    verifyOtpPage,
    dashboardPage
}