const Course = require("../models/Course");

const initialCourses = [
    {
        courseName: "Python Programming",
        courseCode: "CS101",
        instructor: "Dr. Shri",
        duration: "8 Weeks",
        category: "Programming",
        description: "Learn Python programming from beginner to advanced level.",
        status: "Active"
    },
    {
        courseName: "Web Development",
        courseCode: "WD101",
        instructor: "Dr. Abhi",
        duration: "10 Weeks",
        category: "Web Development",
        description: "Learn modern web development.",
        status: "Active"
    }
];

const seedCourses = async () => {
    for (const course of initialCourses) {
        await Course.findOneAndUpdate(
            { courseCode: course.courseCode },
            { $setOnInsert: course },
            { upsert: true}
        );
    }

    console.log("Initial courses initialized");
};

module.exports = seedCourses;