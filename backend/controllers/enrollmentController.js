const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId
        });

        if (existingEnrollment) {
            if (existingEnrollment.status === "withdrawn") {
                existingEnrollment.status = "active";
                existingEnrollment.enrolledAt = new Date();
                await existingEnrollment.save();

                return res.json({
                    success: true,
                    message: "Course enrollment reactivated successfully",
                    data: existingEnrollment
                });
            }

            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId
        });

        res.status(201).json({
            success: true,
            message: "Enrolled successfully",
            data: enrollment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to enroll in this course"
        });
    }
};

module.exports = {
    enrollCourse
};