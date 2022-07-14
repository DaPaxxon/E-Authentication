const {User}=require("../models/User");

const delete_user = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if (deleteUser) {
            res.redirect("/users")
        } else {
            const users = await User.find({});
            if (users) {
                res.status(400).render("Users", { message: null, data: { email: res.locals.user.email, username: res.locals.user.username, users: users }, error: "Error deleting user"})
            } else {
                res.status(400).render("Users", { message: null, data: { email: res.locals.user.email, username: res.locals.user.username, users: [] }, error: "Error deleting user"})
            }
        }
    } catch (e) {
        res.status(500).render("Users", { message: null, data: { email: res.locals.user.email, username: res.locals.user.username, users: [] }, error: "Something went wrong. Please refresh page"})
    }
}

module.exports = {
    delete_user
}