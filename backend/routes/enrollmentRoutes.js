
const express = require("express");
const router = express.Router();

const {
    enrollCourse,
    getMyCourses
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get courses enrolled by the logged-in student
router.get("/my", authMiddleware, authorizeRoles("student"), getMyCourses);

// Enroll in a course
router.post("/:courseId", authMiddleware, authorizeRoles("student"), enrollCourse);

module.exports = router;
