const courseService = require("../services/courseService");

const getCourses = (req, res) => {
    const courses = courseService.getAllCourses();
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
};

const getCourse = (req, res) => {
    const course = courseService.getCourseById(req.params.id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    res.json({
        success: true,
        data: course
    });
};

const addCourse = (req, res) => {
    const course = courseService.createCourse(req.body);
    res.status(201).json({
        success: true,
        data: course
    });
};

const editCourse = (req, res) => {
    const course = courseService.updateCourse(req.params.id, req.body);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    res.json({
        success: true,
        data: course
    });
};

const removeCourse = (req, res) => {
    const course = courseService.deleteCourse(req.params.id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }

    res.json({
        success: true,
        message: "Course deleted successfully",
        data: course
    });
};

module.exports = {
    getCourses,
    getCourse,
    addCourse,
    editCourse,
    removeCourse
};
