const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const userCourseSchema = new Schema({
    courseId: {
        type: String,
        required: [true, "Please provide course id"]
    },
    studentId: {
        type: String,
        required: [true, "Please provide student id"]
    }
}, {timestamps: true})

const UserCourse = mongoose.model("UserCourse", userCourseSchema);

module.exports=UserCourse