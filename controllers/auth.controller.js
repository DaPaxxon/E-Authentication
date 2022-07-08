
const {User, validateUser}=require("../models/User");

const bcrypt = require("bcrypt");


const register_user = async (req, res, next) => {
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
                res.status(400).json({ message: null, data: null, error: "Username or email already exists" })
            } else {
                const validateStatus = validateUser(newUserDetails);

                if (validateStatus.error) {
                    res.status(400).json({message: null, data: null, error: `${validateStatus.error.details[0].context.label}` });
                } else {
                    bcrypt.hash(password, 10, function (error, hash) {
                        if (error) {
                            res.status(500).json({ message: null, data: null, error: "Something went wrong" })
                        } else {
                            const user = new User({ ...newUserDetails, password: hash });
    
                            user.save((err, done) => {
                                if (err) {
                                    res.status(500).json({ message: null, data: null, error: "Something went wrong" })
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
                                    res.status(200).json({ message: "User registered!", data: picked, error: null });
                                }
                            })
                        }
                    });
                }
            }
        } else {
            res.status(400).json({ message: null, data: null, error: "Passwords does not match" })
        }
    } catch (e) {
        res.status(500).json({ message: null, data: null, error: "Something went wrong" })
    }
}


module.exports = {
    register_user
}