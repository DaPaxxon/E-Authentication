const express = require("express");

const authRoute = express.Router();

const authController=require("../controllers/auth.controller")

authRoute.post("/register", authController.register_user)


authRoute.post("/login", authController.login_user_post)


authRoute.get("/logout", authController.logout_get)


module.exports=authRoute