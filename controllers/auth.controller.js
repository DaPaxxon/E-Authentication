
const bcrypt = require("bcrypt");

const {User, validateUser}=require("../models/User");





const register_user = async (req, res) => {
    try {
        const { email,
            username,
            password,
            confPassword,
            phone,
            fullname
        } = req.body;
        
        if (password === confPassword) {
            const oldEmail = await User.findOne({ email });
            const oldUsername = await User.findOne({ username });
            const newUserDetails = {
                email,
                username,
                password,
                confPassword,
                phone,
                fullname
            };

            if (oldUsername || oldEmail) {
                res.status(400).render("Register", { message: null, data: null, error: "Username or email already exists" })
            } else {
                const validateStatus = validateUser(newUserDetails);

                if (validateStatus.error) {
                    res.status(400).render("Register", {message: null, data: null, error: `${validateStatus.error.details[0].context.label}` });
                } else {
                    bcrypt.hash(password, 10, function (error, hash) {
                        if (error) {
                            res.status(500).render("Register", { message: null, data: null, error: "Something went wrong" })
                        } else {
                            const user = new User({ ...newUserDetails, password: hash });
    
                            user.save((err, done) => {
                                if (err) {
                                    res.status(500).render("Register", { message: null, data: null, error: "Something went wrong" })
                                } else {
                                    const picked = (({
                                        email,
                                        username,
                                        phone,
                                        fullname }) => ({
                                            email,
                                            username,
                                            phone,
                                            fullname
                                        }))(done);
                                    res.status(201).render("Register", { message: "User registered! Please login", data: picked, error: null });
                                }
                            })
                        }
                    });
                }
            }
        } else {
            res.status(400).render("Register", { message: null, data: null, error: "Passwords does not match" })
        }
    } catch (e) {
        res.status(500).render("Register", { message: null, data: null, error: "Something went wrong" })
    }
}




const login_user_post = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user= await User.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password)
                .then(function (result) {
                    if (result === true) {
                       

                        //genOtp(user, req, res);
                        req.session.userId = user._id;
                        res.status(200).redirect("/dashboard")
                    } else  {
                        res.status(403).render("Login", {message: null, data: null, error: "Password Incorrect"})
                    }
                })
                .catch((err) => {
                    res.status(500).render("Login", { message: null, data: null, error: "Something went wrong" })
                })
        } else {
            res.status(400).render("Login", { message: null, data: null, error: "No user with that email" })
        }
    } catch (e) {
        res.status(500).render("Login", { message: null, data: null, error: "Something went wrong" })
    }
}




const logout_get=(req, res)=>{
    
    req.session.destroy((err)=>{
        if(err){
            res.status(500).render("Error", {errorTxt: "Server Error"});;
        }
        else{
                res.redirect("/")
        }
    })
};



module.exports = {
    register_user,
    login_user_post,
    logout_get
}