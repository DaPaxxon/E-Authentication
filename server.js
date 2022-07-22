require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const session=require("express-session");
const mongoose=require("mongoose");
const MongoStore = require("connect-mongo");





const PORT=process.env.PORT || 5000;

const mongoUrl=process.env.TEST_MONGO_URI;

//create connection asynchronously
mongoose.connect(mongoUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result)=>{
        console.log("MongoDb Connected");
        app.listen(PORT, ()=>{console.log(`Server running on ${PORT}`)});
    })
    .catch(err=>console.log(err));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*30 //30minutes
    },
    store: MongoStore.create({
        mongoUrl
    })
}));

//set view engine
app.set("view engine", "ejs");


//use public folder
app.use("/public", express.static(path.join(__dirname, "public")));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



const middleware = require("./middleware/authMiddleware");
//check if there is a user logged in.
//if there is, update cookie

app.use(middleware.shouldUpdateCookie)




const pagesRoute = require("./routes/pages.routes");
const authRoute = require("./routes/auth.routes");
const coursesRoute = require("./routes/courses.routes");
const deleteRoute = require("./routes/delete.routes");


app.use("/", pagesRoute)
app.use("/", authRoute)
app.use("/", coursesRoute)
app.use("/delete", deleteRoute)