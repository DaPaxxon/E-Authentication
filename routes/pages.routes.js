const express = require("express");
const pagesRoute = express.Router();

const pages = require("../controllers/pages.controller");
const middleware = require("../middleware/authMiddleware");


pagesRoute.get("/", pages.homepage)
pagesRoute.get("/login", pages.loginPage)
pagesRoute.get("/register", pages.registerPage)
pagesRoute.get("/verify", pages.verifyOtpPage)
pagesRoute.get("/dashboard", middleware.requireAuth, pages.dashboardPage)


module.exports=pagesRoute