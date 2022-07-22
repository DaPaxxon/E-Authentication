const express = require("express");
const pagesRoute = express.Router();

const pages = require("../controllers/pages.controller");
const middleware = require("../middleware/authMiddleware");




pagesRoute.get("/", pages.homepage)
pagesRoute.get("/login", middleware.redirectToDashboard, pages.loginPage)
pagesRoute.get("/register", middleware.redirectToDashboard, pages.registerPage)
pagesRoute.get("/verify", middleware.requireAuth, pages.verifyOtpPage)
pagesRoute.get("/dashboard", middleware.requireAuth, pages.dashboardPage)
pagesRoute.get("/confirm-payment", middleware.requireAuth, pages.confirmPaymentPage)
pagesRoute.get("/course-registration", middleware.requireAuth, pages.registerCoursesPage)
pagesRoute.get("/add-course", middleware.requireAuth, pages.addCoursesPage)
pagesRoute.get("/users", middleware.requireAuth, pages.allUsersPage)


module.exports=pagesRoute