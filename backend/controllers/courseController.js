const courseService = require("../services/courseService");

const getCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();

        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const addCourse = async (req, res) => {
    try {
        const course = await courseService.createCourse(req.body);

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const editCourse = async (req, res) => {
    try {
        const course = await courseService.updateCourse(
            req.params.id,
            req.body
        );

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const removeCourse = async (req, res) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getCourses,
    getCourse,
    addCourse,
    editCourse,
    removeCourse
};