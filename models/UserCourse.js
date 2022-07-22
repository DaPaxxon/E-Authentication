const mongoose=require("mongoose");

const Schema = mongoose.Schema;



const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide course title"],
        unique: [true, "Course already exist"],
    },
    code: {
        type: String,
        required: [true, "Please provide course code"],
        unique: [true, "Course code already exist"],
    },
    unit: {
        type: String,
        required: [true, "Please provide course unit"]
    },
    type: {
        type: String,
        required: [true, "Please provide course type"]
    },
    session: {
        type: String,
        required: [true, "Please provide course session"]
    },
    level: {
        type: Number,
        required: [true, "Please provide course level"]
    },
    semester: {
        type: String,
        required: [true, "Please provide course semester"]
    },
}, {timestamps: true})


const userCourseSchema = new Schema({
    courses: {
        type: courseSchema,
        required: [true, "Please provide courses"]
    },
    studentId: {
        type: String,
        required: [true, "Please provide student id"],
        unique: [true, "Student id already exists"]
    }
}, {timestamps: true})

const UserCourse = mongoose.model("UserCourse", userCourseSchema);

module.exports=UserCourse