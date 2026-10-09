const validateCourse = (req, res, next) => {
    const { courseName, courseCode, instructor, duration, category } = req.body;

    if (!courseName || !courseCode || !instructor || !duration || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide courseName, courseCode, instructor, duration, and category"
        });
    }

    next();
};

module.exports = validateCourse;