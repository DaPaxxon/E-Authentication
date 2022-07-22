const express = require("express");

const courseRoute = express.Router();
const middleware = require("../middleware/authMiddleware");

const courses = require("../controllers/courses.controller");



courseRoute.post("/confirm-payment", middleware.requireAuth, courses.confirm_payment_post)
courseRoute.post("/verify", middleware.requireAuth, courses.verify_post)
courseRoute.post("/add-course", middleware.requireAuth, courses.add_course_post)
courseRoute.get("/del-course/:id", middleware.requireAuth, courses.del_course)

module.exports=courseRoute