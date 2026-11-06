const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");

const getProgress = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        const progress = await LearningProgress.findOne({
            student: req.user.id,
            course: courseId
        });

        res.json({
            success: true,
            data: {
                completedLessonIds: progress?.completedLessonIds || [],
                completedLessons: progress?.completedLessons || 0,
                totalLessons: course.lessons.length,
                progressPercentage: progress?.progressPercentage || 0,
                status: enrollment.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch learning progress"
        });
    }
};

const completeLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        });

        if (!enrollment || enrollment.status === "withdrawn") {
            return res.status(403).json({
                success: false,
                message: "Active course enrollment required"
            });
        }

        const totalLessons = course.lessons.length;

        if (totalLessons === 0) {
            return res.status(400).json({
                success: false,
                message: "This course has no lessons"
            });
        }

        let progress = await LearningProgress.findOne({
            student: req.user.id,
            course: courseId
        });

        if (!progress) {
            progress = new LearningProgress({
                student: req.user.id,
                course: courseId,
                totalLessons,
                completedLessonIds: []
            });
        }

        const alreadyCompleted = progress.completedLessonIds.some(
            id => id.toString() === lessonId
        );

        if (!alreadyCompleted) {
            progress.completedLessonIds.push(lesson._id);
        }

        const validLessonIds = course.lessons.map(
            item => item._id.toString()
        );

        progress.completedLessonIds = progress.completedLessonIds.filter(
            id => validLessonIds.includes(id.toString())
        );

        progress.totalLessons = totalLessons;
        progress.completedLessons = progress.completedLessonIds.length;
        progress.progressPercentage = Math.round(
            (progress.completedLessons / totalLessons) * 100
        );

        await progress.save();

        if (progress.completedLessons === totalLessons) {
            enrollment.status = "completed";
            await enrollment.save();
        }

        res.json({
            success: true,
            message: "Lesson completed successfully",
            data: {
                completedLessons: progress.completedLessons,
                totalLessons,
                progressPercentage: progress.progressPercentage,
                status: enrollment.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update learning progress"
        });
    }
};

module.exports = {
    getProgress,
    completeLesson
};