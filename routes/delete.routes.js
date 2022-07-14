const express = require("express")

const deleteRoute = express.Router()

const deleteController = require("../controllers/delete.controller")
const middleware = require("../middleware/authMiddleware");



deleteRoute.get("/users/:id", middleware.requireAuth, deleteController.delete_user)


module.exports = deleteRoute;