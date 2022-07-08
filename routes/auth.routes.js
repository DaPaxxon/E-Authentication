const express = require("express");

const authRoute = express.Router();

const authController=require("../controllers/auth.controller")

authRoute.post("/register", authController.register_user)


module.exports=authRoute