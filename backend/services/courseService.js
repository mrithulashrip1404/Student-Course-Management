const Course = require("../models/Course");

const getAllCourses = async () => {
    return await Course.find().sort({ createdAt: -1 });
};

const getCourseById = async (id) => {
    return await Course.findById(id);
};

const createCourse = async (courseData) => {
    return await Course.create(courseData);
};

const updateCourse = async (id, courseData) => {
    return await Course.findByIdAndUpdate(
        id,
        courseData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};