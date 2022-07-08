const User=require("../models/User");



const requireAuth=(req, res, next)=>{
    User.findOne({unique_id: req.session.userId})
    .then((user)=>{ 
        //if there is a logged user update the cookie so maxAge will reset
        if(user){
            req.session._garbage=Date();
            req.session.touch();
            next();
        }else{
            //if no logged user keep going
            next();   
        }
    }) .catch((err)=>{
        console.log(err)
    });
    
}






module.exports={
    requireAuth
}