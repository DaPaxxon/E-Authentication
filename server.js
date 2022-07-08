require("dotenv").config();
const express = require("express");
const app = express();
const path=require("path");


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

let connection=mongoose.connection;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60*3
    },
    store: MongoStore.create({
        mongoUrl
    })
}));

//set view engine
app.set("view engine", "ejs");


//use public folder
app.use("/public", express.static(path.join(__dirname, "public")));


const pagesRoute = require("./routes/pages.routes");


app.use("/", pagesRoute)