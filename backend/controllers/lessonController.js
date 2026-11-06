const Course = require("../models/Course");

const addLesson = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Lesson title is required"
            });
        }

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        course.lessons.push({
            title: title.trim(),
            description: description || "",
            order: course.lessons.length + 1
        });

        await course.save();

        res.status(201).json({
            success: true,
            message: "Lesson added successfully",
            data: course.lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add lesson"
        });
    }
};

const updateLesson = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        if (req.body.title !== undefined) {
            lesson.title = req.body.title.trim();
        }

        if (req.body.description !== undefined) {
            lesson.description = req.body.description;
        }

        await course.save();

        res.json({
            success: true,
            message: "Lesson updated successfully",
            data: course.lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update lesson"
        });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        lesson.deleteOne();

        course.lessons.forEach((item, index) => {
            item.order = index + 1;
        });

        await course.save();

        res.json({
            success: true,
            message: "Lesson deleted successfully",
            data: course.lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete lesson"
        });
    }
};

module.exports = {
    addLesson,
    updateLesson,
    deleteLesson
};