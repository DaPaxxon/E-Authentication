
const homepage=(req, res) => {
    res.status(200).render("Index")
}


const loginPage=(req, res) => {
    res.status(200).render("Login")
}


const registerPage=(req, res) => {
    res.status(200).render("Register")
}


const dashboardPage=(req, res) => {
    res.status(200).render("Dashboard")
}

module.exports = {
    homepage,
    loginPage,
    registerPage,
    dashboardPage
}