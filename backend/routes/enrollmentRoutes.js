const express = require("express");
const router = express.Router();

const { enrollCourse } = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/:courseId", authMiddleware, authorizeRoles("student"), enrollCourse);

module.exports = router;