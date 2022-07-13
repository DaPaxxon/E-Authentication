const {User}=require("../models/User");



const shouldUpdateCookie = async (req, res, next) => {
    
    try {
        const user = await User.findById(req.session.userId);
        
        //if there is a logged user update the cookie so maxAge will reset
        if(user){
            req.session._garbage=Date();
            req.session.touch();
            next();
        }else{
            //if no logged user keep going
            next();   
        }
    } catch (e) {
        res.status(500).json({ message: null, data: null, error: "Something went wrong" })
    }
    
}






const requireAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId)
        if (user) {
            next()
        } else {
            res.status(403).redirect("/login");
        }
    } catch (e) {
        res.status(500).json({ message: null, data: null, error: "Something went wrong" })
    }

}




module.exports = {
    shouldUpdateCookie,
    requireAuth
}