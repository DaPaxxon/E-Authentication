const express = require("express");
const app = express();
const path=require("path");

const pages = require("./controllers/controller.pages");


const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})




//set view engine
app.set("view engine", "ejs");


//use public folder
app.use("/public", express.static(path.join(__dirname, "public")));



app.get("/", pages.homepage)
app.get("/login", pages.loginPage)
app.get("/register", pages.registerPage)
app.get("/dashboard", pages.dashboardPage)