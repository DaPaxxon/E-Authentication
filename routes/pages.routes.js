const express = require("express");
const pagesRoute = express.Router();

const pages = require("../controllers/pages.controller");
const middleware = require("../middleware/authMiddleware");


pagesRoute.get("/", pages.homepage)
pagesRoute.get("/login", middleware.redirectToDashboard, pages.loginPage)
pagesRoute.get("/register", middleware.redirectToDashboard, pages.registerPage)
pagesRoute.get("/verify", middleware.redirectToDashboard, pages.verifyOtpPage)
pagesRoute.get("/dashboard", middleware.requireAuth, pages.dashboardPage)


module.exports=pagesRoute